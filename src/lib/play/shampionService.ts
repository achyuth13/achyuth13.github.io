import { db, getWriteKey } from "$lib/firebase";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
} from "firebase/firestore";
import type { Team, Match, Tournament } from "$lib/play/shampions";

export class TournamentService {
  private static tournamentId = "shampions-tournament";

  static async createTournament(totalGames: number): Promise<void> {
    const existingTournament = await this.getTournament();
    
    let teams: Team[];
    
    if (existingTournament && existingTournament.teams) {
      // Use existing teams with their cumulative points
      teams = existingTournament.teams.map(team => ({
        ...team,
        // Keep cumulative points and team config
        // Reset only current tournament stats  
        gamesWon: 0,
        gamesLost: 0,
        gamesDrawn: 0,
      }));
    } else {
      // Try to get team config
      const teamConfig = await this.getTeamConfig();
      
      if (teamConfig.length > 0) {
        teams = teamConfig;
      } else {
        // Fallback to default teams
        teams = [
          {
            id: "team1",
            name: "Team 1",
            players: ["Player 1", "Player 2"],
            points: 0,
            gamesWon: 0,
            gamesLost: 0,
            gamesDrawn: 0,
          },
          {
            id: "team2",
            name: "Team 2",
            players: ["Player 3", "Player 4"],
            points: 0,
            gamesWon: 0,
            gamesLost: 0,
            gamesDrawn: 0,
          },
          {
            id: "team3",
            name: "Team 3",
            players: ["Player 5", "Player 6"],
            points: 0,
            gamesWon: 0,
            gamesLost: 0,
            gamesDrawn: 0,
          },
        ];
      }
    }

    const matches = this.generateMatches(totalGames, teams);

    const tournament: Tournament = {
      id: this.tournamentId,
      totalGames,
      currentRound: 1,
      teams,
      matches,
      status: "active",
      createdAt: Date.now(),
      tournamentNumber: existingTournament ? (existingTournament.tournamentNumber || 1) + 1 : 1,
      writeKey: getWriteKey(),
    };

    await setDoc(doc(db, "tournaments", this.tournamentId), tournament);
  }

  static generateMatches(totalGames: number, teams: Team[]): Match[] {
    const matches: Match[] = [];
    const matchups = [
      ["team1", "team2"],
      ["team2", "team3"],
      ["team1", "team3"],
    ];

    let matchNumber = 1;
    const gamesPerMatchup = Math.ceil(totalGames / 3);

    for (let round = 1; round <= gamesPerMatchup; round++) {
      for (const [team1Id, team2Id] of matchups) {
        if (matchNumber > totalGames) break;

        const team1 = teams.find((t) => t.id === team1Id)!;
        const team2 = teams.find((t) => t.id === team2Id)!;

        matches.push({
          id: `match-${matchNumber}`,
          team1Id,
          team2Id,
          team1Name: team1.name,
          team2Name: team2.name,
          round,
          matchNumber,
          completed: false,
          createdAt: Date.now(),
          scheduledDate: null, // Can be set later
          completedAt: null, // Set when match is completed
        });

        matchNumber++;
      }
    }

    return matches.slice(0, totalGames);
  }

  static async updateTeamName(teamId: string, newName: string): Promise<void> {
    const tournament = await this.getTournament();
    if (!tournament) throw new Error('No tournament found');
  
    const updatedTeams = tournament.teams.map(team =>
      team.id === teamId ? { ...team, name: newName } : team
    );
  
    await updateDoc(doc(db, 'tournaments', this.tournamentId), {
      teams: updatedTeams,
      writeKey: getWriteKey()
    });
  }
  
  static async updatePlayerName(teamId: string, playerIndex: number, newName: string): Promise<void> {
    const tournament = await this.getTournament();
    if (!tournament) throw new Error('No tournament found');
  
    const updatedTeams = tournament.teams.map(team => {
      if (team.id === teamId) {
        const updatedPlayers = [...team.players];
        updatedPlayers[playerIndex] = newName;
        return { ...team, players: updatedPlayers };
      }
      return team;
    });
  
    await updateDoc(doc(db, 'tournaments', this.tournamentId), {
      teams: updatedTeams,
      writeKey: getWriteKey()
    });
  }

  static async scheduleMatch(
    matchId: string,
    scheduledDate: number
  ): Promise<void> {
    const tournamentRef = doc(db, "tournaments", this.tournamentId);
    const tournamentSnap = await getDoc(tournamentRef);

    if (!tournamentSnap.exists()) {
      throw new Error("Tournament not found");
    }

    const tournament = tournamentSnap.data() as Tournament;

    const updatedMatches = tournament.matches.map((match) =>
      match.id === matchId ? { ...match, scheduledDate } : match
    );

    await updateDoc(tournamentRef, {
      matches: updatedMatches,
      writeKey: getWriteKey(),
    });
  }

  static async recordMatchResult(
    matchId: string,
    winner: "team1" | "team2" | "draw"
  ): Promise<void> {
    const tournamentRef = doc(db, "tournaments", this.tournamentId);
    const tournamentSnap = await getDoc(tournamentRef);

    if (!tournamentSnap.exists()) {
      throw new Error("Tournament not found");
    }

    const tournament = tournamentSnap.data() as Tournament;

    const matchIndex = tournament.matches.findIndex((m) => m.id === matchId);
    if (matchIndex === -1) {
      throw new Error("Match not found");
    }

    const match = tournament.matches[matchIndex];

    const updatedMatches = [...tournament.matches];
    updatedMatches[matchIndex] = {
      ...match,
      winner,
      completed: true,
      completedAt: Date.now(), // Record when match was completed
    };

    const updatedTeams = tournament.teams.map((team) => {
      if (team.id === match.team1Id) {
        if (winner === "team1") {
          return {
            ...team,
            points: team.points + 3,
            gamesWon: team.gamesWon + 1,
          };
        } else if (winner === "draw") {
          return {
            ...team,
            points: team.points + 1,
            gamesDrawn: team.gamesDrawn + 1,
          };
        } else {
          return {
            ...team,
            gamesLost: team.gamesLost + 1,
          };
        }
      } else if (team.id === match.team2Id) {
        if (winner === "team2") {
          return {
            ...team,
            points: team.points + 3,
            gamesWon: team.gamesWon + 1,
          };
        } else if (winner === "draw") {
          return {
            ...team,
            points: team.points + 1,
            gamesDrawn: team.gamesDrawn + 1,
          };
        } else {
          return {
            ...team,
            gamesLost: team.gamesLost + 1,
          };
        }
      }
      return team;
    });

    const allMatchesCompleted = updatedMatches.every((m) => m.completed);
    const newStatus = allMatchesCompleted ? "completed" : tournament.status;

    await updateDoc(tournamentRef, {
      teams: updatedTeams,
      matches: updatedMatches,
      status: newStatus,
      writeKey: getWriteKey(),
    });
  }

  static subscribeToTournament(
    callback: (tournament: Tournament | null) => void
  ) {
    return onSnapshot(
      doc(db, "tournaments", this.tournamentId),
      (doc) => {
        if (doc.exists()) {
          callback(doc.data() as Tournament);
        } else {
          callback(null);
        }
      },
      (error) => {
        console.error("Error subscribing to tournament:", error);
        callback(null);
      }
    );
  }

  static async startNewTournament(
    totalGames: number,
    keepTeams: boolean = true
  ): Promise<void> {
    const writeKey = getWriteKey();

    if (!writeKey) {
      throw new Error("No valid write key available");
    }

    const tournamentRef = doc(db, "tournaments", this.tournamentId);
    const tournamentSnap = await getDoc(tournamentRef);

    let teams: Team[];
    let currentTournamentNumber = 1;

    if (keepTeams && tournamentSnap.exists()) {
      // Keep existing teams but reset their match stats
      const existingTournament = tournamentSnap.data() as Tournament;
      currentTournamentNumber = (existingTournament.tournamentNumber || 1) + 1;

      teams = existingTournament.teams.map((team) => ({
        ...team,
        // Reset only the current tournament game stats (keep total points)
        gamesWon: 0,
        gamesLost: 0,
        gamesDrawn: 0,
      }));
    } else {
      // Create fresh teams
      teams = [
        {
          id: "team1",
          name: "Team 1",
          players: ["Player 1", "Player 2"],
          points: 0,
          gamesWon: 0,
          gamesLost: 0,
          gamesDrawn: 0,
        },
        {
          id: "team2",
          name: "Team 2",
          players: ["Player 3", "Player 4"],
          points: 0,
          gamesWon: 0,
          gamesLost: 0,
          gamesDrawn: 0,
        },
        {
          id: "team3",
          name: "Team 3",
          players: ["Player 5", "Player 6"],
          points: 0,
          gamesWon: 0,
          gamesLost: 0,
          gamesDrawn: 0,
        },
      ];
    }

    const matches = this.generateMatches(totalGames, teams);

    const tournament: Tournament = {
      id: this.tournamentId,
      totalGames,
      currentRound: 1,
      teams,
      matches,
      status: "active",
      createdAt: Date.now(),
      tournamentNumber: currentTournamentNumber,
      writeKey: writeKey, // Ensure writeKey is included
    };

    // Use setDoc to overwrite the existing document completely
    await setDoc(tournamentRef, tournament);
  }

  static async archiveCurrentTournament(): Promise<void> {
    const tournament = await this.getTournament();
    if (!tournament || tournament.status !== "completed") {
      throw new Error("Can only archive completed tournaments");
    }

    // Save to tournament history
    const historyRef = doc(
      db,
      "tournament-history",
      `tournament-${tournament.tournamentNumber || 1}-${Date.now()}`
    );
    await setDoc(historyRef, {
      ...tournament,
      archivedAt: Date.now(),
      writeKey: getWriteKey(),
    });
  }

  static async getTournamentHistory(): Promise<Tournament[]> {
    // This would fetch previous tournaments if needed
    // For now, we'll keep it simple and just track current
    return [];
  }

  static async getTournament(): Promise<Tournament | null> {
    const tournamentSnap = await getDoc(
      doc(db, "tournaments", this.tournamentId)
    );

    if (tournamentSnap.exists()) {
      return tournamentSnap.data() as Tournament;
    }

    return null;
  }

  static async resetCurrentTournament(): Promise<void> {
    const writeKey = getWriteKey();

    if (!writeKey) {
      throw new Error("No valid write key available");
    }

    const tournament = await this.getTournament();
    
    if (!tournament) {
      throw new Error("No tournament found to reset");
    }

    // Preserve team configuration and cumulative points, reset only current tournament
    const resetTeams = tournament.teams.map(team => ({
      ...team,
      // Keep cumulative points and team config
      // points: team.points, (keep as is)
      // name: team.name, (keep as is) 
      // players: team.players, (keep as is)
      
      // Reset only current tournament stats
      gamesWon: 0,
      gamesLost: 0,
      gamesDrawn: 0
    }));

    const tournamentRef = doc(db, "tournaments", this.tournamentId);

    // Reset tournament to setup state with preserved team data
    await updateDoc(tournamentRef, {
      teams: resetTeams,
      matches: [], // Clear current matches
      status: "setup", // Back to setup state
      currentRound: 1,
      totalGames: tournament.totalGames || 9, // Keep last game count
      resetAt: Date.now(),
      writeKey
    });
  }

  static async deleteAllData(): Promise<void> {
    const writeKey = getWriteKey();

    if (!writeKey) {
      throw new Error("No valid write key available");
    }

    const tournamentRef = doc(db, "tournaments", this.tournamentId);
    const configRef = doc(db, "team-configs", this.tournamentId);

    // Delete both tournament and team config
    await Promise.all([
      deleteDoc(tournamentRef),
      deleteDoc(configRef).catch(() => {}) // Ignore if doesn't exist
    ]);
  }

  static async resetTournament(): Promise<void> {
    const tournamentRef = doc(db, "tournaments", this.tournamentId);
    await updateDoc(tournamentRef, {
      status: "setup",
      writeKey: getWriteKey(),
    });
  }

  // Utility functions for date handling
  static formatMatchDate(timestamp: number | null): string {
    if (!timestamp) return "Not scheduled";

    const date = new Date(timestamp);
    const now = new Date();

    // If it's today
    if (date.toDateString() === now.toDateString()) {
      return `Today at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    // If it's this week
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays >= 0 && diffDays <= 7) {
      return `${date.toLocaleDateString([], {
        weekday: "long",
      })} at ${date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`;
    }

    // Otherwise full date
    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  static getRelativeTime(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  }

  static async checkTournamentExists(): Promise<boolean> {
    try {
      const tournament = await this.getTournament();
      return tournament !== null;
    } catch (error) {
      console.error("Error checking tournament:", error);
      return false;
    }
  }

  static async saveTeamSetup(teams: any[]): Promise<void> {
    const writeKey = getWriteKey();
    
    if (!writeKey) {
      throw new Error('No valid write key available');
    }
  
    // Get existing tournament to preserve cumulative points
    const existingTournament = await this.getTournament();
    
    const teamsWithPoints = teams.map(team => {
      // If team exists, preserve their cumulative points
      const existingTeam = existingTournament?.teams.find(t => t.id === team.id);
      
      return {
        id: team.id,
        name: team.name.trim(),
        players: team.players.map((p: string) => p.trim()),
        points: existingTeam?.points || 0,  // Preserve cumulative points
        gamesWon: 0,
        gamesLost: 0,
        gamesDrawn: 0
      };
    });
  
    // Save team setup to a separate collection for persistence
    await setDoc(doc(db, 'team-configs', this.tournamentId), {
      teams: teamsWithPoints,
      updatedAt: Date.now(),
      writeKey
    });
  
    // Also update current tournament if it exists
    if (existingTournament) {
      await updateDoc(doc(db, 'tournaments', this.tournamentId), {
        teams: teamsWithPoints,
        writeKey
      });
    }
  }

  static async getTeamConfig(): Promise<any[]> {
    const configSnap = await getDoc(doc(db, 'team-configs', this.tournamentId));
    
    if (configSnap.exists()) {
      return configSnap.data().teams || [];
    }
    
    return [];
  }
}
