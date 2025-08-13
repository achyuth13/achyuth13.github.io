<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { TournamentService } from "$lib/play/shampionService";
  import type { Tournament } from "$lib/play/shampions";

  export let tournament: Tournament | null = null;
  export let setupCollapsed = false; // ✨ NEW: Prop to control collapsed state

  const dispatch = createEventDispatcher();

  let totalGames = 9;
  let isCreating = false;
  let isResetting = false;
  let error = "";
  let showLiveRankings = false;
  let editingTeam: string | null = null;
  let editingPlayer: { teamId: string; playerIndex: number } | null = null;
  let tempName = "";

  const gameOptions = [6, 9, 12, 15];

  // Sort teams by points for live rankings
  $: sortedTeams = tournament?.teams
    ? [...tournament.teams].sort((a, b) => {
        if (b.points !== a.points) return b.points - a.points;
        if (b.gamesWon !== a.gamesWon) return b.gamesWon - a.gamesWon;
        return a.gamesLost - b.gamesLost;
      })
    : [];

  // Calculate tournament progress
  $: completedMatches = tournament?.matches
    ? tournament.matches.filter((m) => m.completed).length
    : 0;
  $: totalMatches = tournament?.totalGames || 0;
  $: progress = totalMatches > 0 ? (completedMatches / totalMatches) * 100 : 0;

  // Auto-show live rankings for active tournaments
  $: if (tournament && tournament.status === 'active') {
    showLiveRankings = true;
  }

  async function createTournament() {
    if (totalGames < 3) {
      error = "Minimum 3 games required";
      return;
    }

    isCreating = true;
    error = "";

    try {
      await TournamentService.createTournament(totalGames);
      dispatch("tournamentCreated");
    } catch (err) {
      error = "Failed to create tournament. Please try again.";
      console.error(err);
    }

    isCreating = false;
  }

  async function resetTournament() {
    if (!confirm('Are you sure? This will reset the current tournament but keep cumulative points and team data.')) {
      return;
    }

    isResetting = true;
    error = '';

    try {
      await TournamentService.resetCurrentTournament(); // ✨ Use new method
      dispatch('tournamentCreated');
    } catch (err) {
      error = 'Failed to reset tournament. Please try again.';
      console.error(err);
    }

    isResetting = false;
  }

  async function deleteAllData() {
    if (!confirm('⚠️ DANGER: This will permanently delete ALL data including cumulative points. Are you absolutely sure?')) {
      return;
    }

    if (!confirm('This cannot be undone. Type "DELETE" to confirm you want to wipe everything.')) {
      return;
    }

    isResetting = true;
    error = '';

    try {
      await TournamentService.deleteAllData();
      dispatch('tournamentCreated');
    } catch (err) {
      error = 'Failed to delete data. Please try again.';
      console.error(err);
    }

    isResetting = false;
  }

  function toggleCollapse() {
    dispatch("toggleCollapse");
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
</script>

<div class="max-w-4xl mx-auto space-y-8">
  <!-- Collapsible Header (always visible) -->
  {#if tournament && (tournament.status === "active" || tournament.status === "completed")}
    <div
      class="bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 overflow-hidden"
    >
      <!-- Collapsed Header -->
      <button
        on:click={toggleCollapse}
        class="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-all duration-200"
      >
        <div class="flex items-center gap-4">
          <div class="text-3xl">🏸</div>
          <div class="text-left">
            <h3 class="text-xl font-bold">
              Tournament #{tournament.tournamentNumber || 1}
              {#if tournament.status === "completed"}
                <span class="text-green-400">✅ Complete</span>
              {:else}
                <span class="text-blue-400">🎮 Active</span>
              {/if}
            </h3>
            <p class="text-sm text-gray-400">
              {completedMatches}/{totalMatches} matches • {progress.toFixed(0)}%
              complete
            </p>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <!-- Quick Stats -->
          <div class="hidden md:flex items-center gap-6 text-sm">
            <div class="text-center">
              <div class="font-bold text-green-400">{completedMatches}</div>
              <div class="text-gray-400">Played</div>
            </div>
            <div class="text-center">
              <div class="font-bold text-blue-400">
                {totalMatches - completedMatches}
              </div>
              <div class="text-gray-400">Remaining</div>
            </div>
          </div>

          <!-- Collapse Icon -->
          <div
            class="transform transition-transform duration-200 {setupCollapsed
              ? 'rotate-180'
              : ''}"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </button>

      <!-- Expandable Content -->
      {#if !setupCollapsed}
        <div class="px-6 pb-6 border-t border-white/10">
          <!-- Tournament Controls -->
          <div class="space-y-6 mt-6">
            <!-- Progress Bar -->
            <div
              class="bg-purple-500/20 border border-purple-500/50 rounded-lg p-4"
            >
              <div class="flex justify-between items-center mb-3">
                <h4 class="font-semibold">Tournament Progress</h4>
                <span class="text-sm text-gray-400"
                  >{progress.toFixed(0)}% Complete</span
                >
              </div>
              <div class="w-full bg-gray-700 rounded-full h-3 mb-3">
                <div
                  class="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
                  style="width: {progress}%"
                ></div>
              </div>
              <div class="text-sm text-gray-300">
                {completedMatches} of {totalMatches} matches completed
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3">
              <button
                on:click={() => (showLiveRankings = !showLiveRankings)}
                class="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-lg transition-all duration-200"
              >
                {showLiveRankings ? "Hide" : "Show"} Live Rankings
              </button>

              <button
                on:click={resetTournament}
                disabled={isResetting}
                class="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 text-white py-3 px-6 rounded-lg transition-all duration-200"
                title="Reset current tournament (keeps cumulative points)"
              >
                {isResetting ? "Resetting..." : "Reset Tournament"}
              </button>

              <!-- Optional: Add a separate danger button for complete wipe -->
              <button
                on:click={deleteAllData}
                disabled={isResetting}
                class="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white py-3 px-4 rounded-lg transition-all duration-200 text-xs"
                title="⚠️ Permanently delete ALL data"
              >
                ⚠️ Wipe All
              </button>
            </div>

            {#if error}
              <div
                class="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200"
              >
                {error}
              </div>
            {/if}
          </div>
        </div>
      {/if}
    </div>
    {:else}
    <!-- Full Setup Card (when no tournament exists) -->
    <div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
      <div class="text-center mb-8">
        <div class="text-6xl mb-4">🏸</div>
        <h2 class="text-3xl font-bold mb-2">Tournament Central</h2>
      </div>
  
      <!-- Tournament Creation Form -->
      <div class="space-y-6">
        <div>
          <label class="block text-lg font-medium mb-4">Number of Games</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            {#each gameOptions as option}
              <button
                on:click={() => (totalGames = option)}
                class="p-4 rounded-lg border-2 transition-all duration-200 {totalGames === option
                  ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300'
                  : 'border-gray-600 bg-black/20 hover:border-gray-500'}"
              >
                <div class="text-2xl font-bold">{option}</div>
                <div class="text-sm text-gray-400">games</div>
              </button>
            {/each}
          </div>
        </div>
  
        <div class="bg-blue-500/20 border border-blue-500/50 rounded-lg p-4">
          <h3 class="font-semibold mb-2">Tournament Info:</h3>
          <ul class="text-sm text-gray-300 space-y-1">
            <li>• 3 Teams will compete</li>
            <li>• Each team plays against every other team</li>
            <li>• Win: 3 points, Draw: 1 point each, Loss: 0 points</li>
            <li>• Total matches: {totalGames}</li>
          </ul>
        </div>
  
        {#if error}
          <div class="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200">
            {error}
          </div>
        {/if}
  
        <button
          on:click={createTournament}
          disabled={isCreating}
          class="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isCreating ? "Creating Tournament..." : "Start Tournament"}
        </button>
      </div>
    </div>
  {/if}

  <!-- Live Rankings Preview -->
  {#if tournament && (showLiveRankings || tournament.status === "completed")}
    <div
      class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
    >
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold flex items-center gap-2">
          🏆 {tournament.status === "completed" ? "Final" : "Live"} Rankings
          <span class="text-sm text-gray-400"
            >#{tournament.tournamentNumber || 1}</span
          >
        </h3>
        {#if tournament.status === "active"}
          <div class="text-sm text-gray-300">Updates in real-time</div>
        {/if}
      </div>

      <div class="space-y-3">
        {#each sortedTeams as team, index}
          <div class="bg-black/30 rounded-lg p-4 border border-gray-600">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="text-2xl font-bold">
                  {getRankEmoji(index)}
                </div>
                <div>
                  <div class="font-semibold">{team.name}</div>
                  <div class="text-sm text-gray-400"></div>
                    {team.players.join(" & ")}
                  </div>
                </div>
              </div>

              <div class="text-right">
                <div class="text-xl font-bold {getPointsColor(team.points)}">
                  {team.points}
                </div>
                <div class="text-xs text-gray-400">points</div>
              </div>
            </div>

            <!-- Team Stats -->
            <div
              class="grid grid-cols-3 gap-4 mt-3 pt-3 border-t border-gray-600"
            >
              <div class="text-center">
                <div class="font-semibold text-green-400">{team.gamesWon}</div>
                <div class="text-xs text-gray-400">Won</div>
              </div>
              <div class="text-center">
                <div class="font-semibold text-yellow-400">
                  {team.gamesDrawn}
                </div>
                <div class="text-xs text-gray-400">Draw</div>
              </div>
              <div class="text-center">
                <div class="font-semibold text-red-400">{team.gamesLost}</div>
                <div class="text-xs text-gray-400">Lost</div>
              </div>
            </div>
        {/each}
      </div>

      <!-- Scoring Legend -->
      <div class="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-600">
        <div class="text-sm text-gray-300 mb-2 font-semibold">
          Scoring System:
        </div>
        <div
          class="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-gray-400"
        >
          <div>
            🥇 Win: <span class="text-green-400 font-semibold">3 points</span>
          </div>
          <div>
            🤝 Draw: <span class="text-yellow-400 font-semibold"
              >1 point each</span
            >
          </div>
          <div>
            ❌ Loss: <span class="text-red-400 font-semibold">0 points</span>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>
