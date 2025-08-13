<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Match, Team } from '$lib/play/shampions';
  import { TournamentService } from '$lib/play/shampionService';
  import MatchCard from './MatchCard.svelte';

  export let matches: Match[];
  export let teams: Team[];
  
  const dispatch = createEventDispatcher();
  
  let selectedFilter: 'all' | 'pending' | 'completed' = 'all';
  
  // Get team name by ID
  function getTeamName(teamId: string): string {
    return teams.find(t => t.id === teamId)?.name || teamId;
  }
  
  // Filter matches based on selected filter
  $: filteredMatches = matches.filter(match => {
    switch (selectedFilter) {
      case 'pending':
        return !match.completed;
      case 'completed':
        return match.completed;
      default:
        return true;
    }
  });

  // Group matches by round
  $: groupedMatches = filteredMatches.reduce((groups, match) => {
    const round = match.round;
    if (!groups[round]) {
      groups[round] = [];
    }
    groups[round].push(match);
    return groups;
  }, {} as Record<number, Match[]>);

  // Get statistics
  $: totalMatches = matches.length;
  $: completedMatches = matches.filter(m => m.completed).length;
  $: pendingMatches = totalMatches - completedMatches;
  $: tournamentProgress = totalMatches > 0 ? (completedMatches / totalMatches) * 100 : 0;

  async function handleMatchResult(event: CustomEvent<{matchId: string, winner: 'team1' | 'team2' | 'draw'}>) {
    const { matchId, winner } = event.detail;
    await TournamentService.recordMatchResult(matchId, winner);
  }

  function getFilterButtonClass(filter: string): string {
    const baseClass = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200";
    if (selectedFilter === filter) {
      return `${baseClass} bg-yellow-400 text-black`;
    }
    return `${baseClass} bg-black/30 text-gray-300 hover:bg-black/50 border border-gray-600`;
  }

  function getNextMatch(): Match | null {
    return matches.find(m => !m.completed) || null;
  }

  $: nextMatch = getNextMatch();
</script>

<div class="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
  <!-- Header -->
  <div class="flex items-center justify-between mb-6">
    <h2 class="text-2xl font-bold flex items-center gap-2">
      🏸 Match Schedule
    </h2>
    <div class="text-sm text-gray-300">
      {completedMatches}/{totalMatches} completed
    </div>
  </div>

  <!-- Tournament Progress -->
  <div class="mb-6">
    <div class="flex justify-between items-center mb-2">
      <span class="text-sm font-medium">Tournament Progress</span>
      <span class="text-sm text-gray-400">{tournamentProgress.toFixed(0)}%</span>
    </div>
    <div class="w-full bg-gray-700 rounded-full h-2">
      <div 
        class="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
        style="width: {tournamentProgress}%"
      ></div>
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-3 gap-4 mb-6">
    <div class="bg-green-500/20 border border-green-500/50 rounded-lg p-3 text-center">
      <div class="text-2xl font-bold text-green-400">{completedMatches}</div>
      <div class="text-xs text-gray-300">Completed</div>
    </div>
    <div class="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3 text-center">
      <div class="text-2xl font-bold text-yellow-400">{pendingMatches}</div>
      <div class="text-xs text-gray-300">Pending</div>
    </div>
    <div class="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3 text-center">
      <div class="text-2xl font-bold text-blue-400">{totalMatches}</div>
      <div class="text-xs text-gray-300">Total</div>
    </div>
  </div>

  <!-- Filter Buttons -->
  <div class="flex gap-2 mb-6">
    <button 
      on:click={() => selectedFilter = 'all'}
      class={getFilterButtonClass('all')}
    >
      All Matches
    </button>
    <button 
      on:click={() => selectedFilter = 'pending'}
      class={getFilterButtonClass('pending')}
    >
      Pending ({pendingMatches})
    </button>
    <button 
      on:click={() => selectedFilter = 'completed'}
      class={getFilterButtonClass('completed')}
    >
      Completed ({completedMatches})
    </button>
  </div>

  <!-- Matches by Round -->
  <div class="space-y-6">
    {#each Object.entries(groupedMatches).sort(([a], [b]) => parseInt(a) - parseInt(b)) as [round, roundMatches]}
      <div class="space-y-3">
        <h3 class="text-lg font-semibold text-gray-300 border-b border-gray-600 pb-2">
          Round {round}
        </h3>
        <div class="space-y-3">
          {#each roundMatches.sort((a, b) => a.matchNumber - b.matchNumber) as match}
            <MatchCard 
              {match} 
              {teams}
              on:matchResult={handleMatchResult}
            />
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <!-- Empty State -->
  {#if filteredMatches.length === 0}
    <div class="text-center py-12">
      <div class="text-6xl mb-4">🏸</div>
      <div class="text-xl font-semibold mb-2">No matches found</div>
      <div class="text-gray-400">
        {#if selectedFilter === 'pending'}
          All matches have been completed!
        {:else if selectedFilter === 'completed'}
          No matches have been completed yet.
        {:else}
          No matches scheduled.
        {/if}
      </div>
    </div>
  {/if}

  <!-- Tournament Complete Message -->
  {#if pendingMatches === 0 && totalMatches > 0}
    <div class="mt-6 p-4 bg-gradient-to-r from-green-500/20 to-yellow-500/20 border border-green-500/50 rounded-lg text-center">
      <div class="text-2xl mb-2">🎉</div>
      <div class="text-lg font-bold text-green-300">Tournament Complete!</div>
      <div class="text-sm text-gray-300 mt-1">
        Check the leaderboard to see the final rankings!
      </div>
    </div>
  {/if}
</div>