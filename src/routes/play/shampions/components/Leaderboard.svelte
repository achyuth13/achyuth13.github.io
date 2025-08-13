<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import type { Team, Tournament } from "$lib/play/shampions";
  import { TournamentService } from "$lib/play/shampionService";
  import NewTournamentDialog from "./NewTournamentDialog.svelte";

  export let teams: Team[];
  export let tournament: Tournament;

  const dispatch = createEventDispatcher();

  let editingTeam: string | null = null;
  let editingPlayer: { teamId: string; playerIndex: number } | null = null;
  let tempName = "";
  let showNewTournamentDialog = false;

  // Sort teams by points (descending), then by games won
  $: sortedTeams = [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.gamesWon !== a.gamesWon) return b.gamesWon - a.gamesWon;
    return a.gamesLost - b.gamesLost;
  });

  function startEditingTeam(teamId: string, currentName: string) {
    editingTeam = teamId;
    tempName = currentName;
  }

  function startEditingPlayer(
    teamId: string,
    playerIndex: number,
    currentName: string
  ) {
    editingPlayer = { teamId, playerIndex };
    tempName = currentName;
  }

  async function saveTeamName(teamId: string) {
    if (tempName.trim()) {
      await TournamentService.updateTeamName(teamId, tempName.trim());
    }
    editingTeam = null;
    tempName = "";
  }

  async function savePlayerName(teamId: string, playerIndex: number) {
    if (tempName.trim()) {
      await TournamentService.updatePlayerName(
        teamId,
        playerIndex,
        tempName.trim()
      );
    }
    editingPlayer = null;
    tempName = "";
  }

  function cancelEdit() {
    editingTeam = null;
    editingPlayer = null;
    tempName = "";
  }

  function handleKeyPress(event: KeyboardEvent, action: () => void) {
    if (event.key === "Enter") {
      action();
    } else if (event.key === "Escape") {
      cancelEdit();
    }
  }

  function getRankEmoji(index: number): string {
    switch (index) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return `${index + 1}`;
    }
  }

  function getPointsColor(points: number): string {
    if (points >= 15) return "text-yellow-400";
    if (points >= 10) return "text-green-400";
    if (points >= 5) return "text-blue-400";
    return "text-gray-400";
  }

  function handleNewTournament() {
    dispatch("newTournament");
  }
</script>

<div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold flex items-center gap-2">
      🏆 Leaderboard
      {#if tournament.tournamentNumber}
        <span class="text-sm text-gray-400">#{tournament.tournamentNumber}</span
        >
      {/if}
    </h2>
    <div class="flex items-center gap-3">
      <div class="text-sm text-gray-300">Live Rankings</div>
      {#if tournament.status === "completed"}
        <button
          on:click={() => (showNewTournamentDialog = true)}
          class="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-all"
        >
          New Tournament
        </button>
      {/if}
    </div>
  </div>

  <div class="space-y-4">
    {#each sortedTeams as team, index}
      <div
        class="bg-black/30 rounded-lg p-4 border border-gray-600 hover:border-gray-500 transition-all duration-200"
      >
        <!-- Team Header -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-3">
            <div class="text-3xl font-bold">
              {getRankEmoji(index)}
            </div>

            {#if editingTeam === team.id}
              <input
                bind:value={tempName}
                on:keydown={(e) =>
                  handleKeyPress(e, () => saveTeamName(team.id))}
                on:blur={() => saveTeamName(team.id)}
                class="bg-black/50 border border-yellow-400 rounded px-2 py-1 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-yellow-400"
                autofocus
              />
            {:else}
              <button
                on:click={() => startEditingTeam(team.id, team.name)}
                class="text-lg font-semibold hover:text-yellow-400 transition-colors duration-200 text-left"
              >
                {team.name}
                <span class="text-xs text-gray-400 ml-2">✏️</span>
              </button>
            {/if}
          </div>

          <div class="text-right">
            <div class="text-2xl font-bold {getPointsColor(team.points)}">
              {team.points}
            </div>
            <div class="text-xs text-gray-400">points</div>
          </div>
        </div>

        <!-- Team Stats -->
        <div class="grid grid-cols-3 gap-4 mb-3">
          <div class="text-center">
            <div class="text-lg font-semibold text-green-400">
              {team.gamesWon}
            </div>
            <div class="text-xs text-gray-400">Won</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold text-yellow-400">
              {team.gamesDrawn}
            </div>
            <div class="text-xs text-gray-400">Draw</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold text-red-400">
              {team.gamesLost}
            </div>
            <div class="text-xs text-gray-400">Lost</div>
          </div>
        </div>

        <!-- Players -->
        <div class="border-t border-gray-600 pt-3">
          <div class="text-sm text-gray-400 mb-2">Players:</div>
          <div class="flex flex-wrap gap-2">
            {#each team.players as player, playerIndex}
              {#if editingPlayer?.teamId === team.id && editingPlayer?.playerIndex === playerIndex}
                <input
                  bind:value={tempName}
                  on:keydown={(e) =>
                    handleKeyPress(e, () =>
                      savePlayerName(team.id, playerIndex)
                    )}
                  on:blur={() => savePlayerName(team.id, playerIndex)}
                  class="bg-black/50 border border-yellow-400 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  autofocus
                />
              {:else}
                <button
                  on:click={() =>
                    startEditingPlayer(team.id, playerIndex, player)}
                  class="bg-blue-500/20 hover:bg-blue-500/30 px-3 py-1 rounded-full text-sm transition-colors duration-200 border border-blue-500/50"
                >
                  {player}
                  <span class="text-xs ml-1">✏️</span>
                </button>
              {/if}
            {/each}
          </div>
        </div>
      </div>
    {/each}
    {#if tournament.status === "completed"}
      <div
        class="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-yellow-500/20 border border-green-500/50 rounded-lg text-center"
      >
        <div class="text-2xl mb-2">🎉</div>
        <div class="text-lg font-bold text-green-300">
          Tournament #{tournament.tournamentNumber || 1} Complete!
        </div>
        <div class="text-sm text-gray-300 mt-1">
          Ready to start a new tournament?
        </div>
      </div>
    {/if}
  </div>

  <!-- Legend -->
  <div class="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
    <div class="text-sm text-gray-300 mb-2 font-semibold">Scoring System:</div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-400">
      <div>
        🥇 Win: <span class="text-green-400 font-semibold">3 points</span>
      </div>
      <div>
        🤝 Draw: <span class="text-yellow-400 font-semibold">1 point each</span>
      </div>
      <div>
        ❌ Loss: <span class="text-red-400 font-semibold">0 points</span>
      </div>
    </div>
  </div>
</div>

<NewTournamentDialog 
  bind:showDialog={showNewTournamentDialog} 
  currentTournament={tournament}
  on:tournamentCreated={handleNewTournament}
/>
