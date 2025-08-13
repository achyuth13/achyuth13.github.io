export interface Team {
  id: string;
  name: string;
  players: string[];
  points: number;
  gamesWon: number;
  gamesLost: number;
  gamesDrawn: number;
}

export interface Match {
  id: string;
  team1Id: string;
  team2Id: string;
  team1Name: string;
  team2Name: string;
  winner?: 'team1' | 'team2' | 'draw';
  round: number;
  matchNumber: number;
  completed: boolean;
  createdAt: number;           
  scheduledDate: number | null; 
  completedAt: number | null;  
}

export interface Tournament {
  id: string;
  totalGames: number;
  currentRound: number;
  teams: Team[];
  matches: Match[];
  status: 'setup' | 'active' | 'completed';
  createdAt: number;     
  tournamentNumber?: number;
  writeKey?: number | null;     
}