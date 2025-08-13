<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Match, Team } from '$lib/play/shampions';

  export let match: Match;
  export let teams: Team[];
  
  const dispatch = createEventDispatcher();
  
  let showResultButtons = false;
  
  // Get team name by ID
  function getTeamName(teamId: string): string {
    return teams.find(t => t.id === teamId)?.name || teamId;
  }
  
  function recordResult(winner: 'team1' | 'team2' | 'draw') {
    dispatch('matchResult', {
      matchId: match.id,
      winner
    });
    showResultButtons = false;
  }

  function getResultText(): string {
    if (!match.completed) return '';
    
    switch (match.winner) {
      case 'team1':
        return `${getTeamName(match.team1Id)} Won`;
      case 'team2':
        return `${getTeamName(match.team2Id)} Won`;
      case 'draw':
        return 'Draw';
      default:
        return '';
    }
  }

  function getResultEmoji(): string {
    if (!match.completed) return '⏳';
    
    switch (match.winner) {
      case 'team1':
      case 'team2':
        return '🏆';
      case 'draw':
        return '🤝';
      default:
        return '❓';
    }
  }

  function getCardBorderClass(): string {
    if (!match.completed) {
      return 'border-gray-600 hover:border-yellow-400';
    }
    
    switch (match.winner) {
      case 'team1':
      case 'team2':
        return 'border-green-500/50';
      case 'draw':
        return 'border-yellow-500/50';
      default:
        return 'border-gray-600';
    }
  }
</script>

<div class="bg-black/30 rounded-lg p-4 border {getCardBorderClass()} transition-all duration-200">
  <!-- Match Header -->
  <div class="flex items-center justify-between mb-3">
    <div class="flex items-center gap-2">
      <span class="text-lg">{getResultEmoji()}</span>
      <span class="text-sm font-medium text-gray-400">
        Match #{match.matchNumber}
      </span>
    </div>
    <div class="text-xs text-gray-500">
      Round {match.round}
    </div>
  </div>

  <!-- Teams -->
  <div class="space-y-2 mb-4">
    <div class="flex items-center justify-between p-2 bg-blue-500/10 rounded border border-blue-500/30">
      <span class="font-semibold">{getTeamName(match.team1Id)}</span>
      {#if match.completed && match.winner === 'team1'}
        <span class="text-green-400 font-bold">🏆 Winner</span>
      {/if}
    </div>
    
    <div class="text-center text-gray-400 font-bold">VS</div>
    
    <div class="flex items-center justify-between p-2 bg-red-500/10 rounded border border-red-500/30">
      <span class="font-semibold">{getTeamName(match.team2Id)}</span>
      {#if match.completed && match.winner === 'team2'}
        <span class="text-green-400 font-bold">🏆 Winner</span>
      {/if}
    </div>
  </div>

  <!-- Result or Action Buttons -->
  {#if match.completed}
    <div class="bg-gray-800/50 rounded-lg p-3 text-center">
      <div class="font-semibold text-lg">
        {getResultText()}
      </div>
      {#if match.winner === 'draw'}
        <div class="text-sm text-gray-400 mt-1">Both teams get 1 point</div>
      {/if}
    </div>
  {:else}
    <div class="space-y-3">
      {#if !showResultButtons}
        <button
          on:click={() => showResultButtons = true}
          class="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
        >
          Record Result
        </button>
      {:else}
        <div class="space-y-2">
          <div class="text-sm text-gray-300 text-center mb-3">Who won this match?</div>
          
          <button
            on:click={() => recordResult('team1')}
            class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
          >
            {getTeamName(match.team1Id)} Wins (+3 points)
          </button>
          
          <button
            on:click={() => recordResult('team2')}
            class="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
          >
            {getTeamName(match.team2Id)} Wins (+3 points)
          </button>
          
          <button
            on:click={() => recordResult('draw')}
            class="w-full bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
          >
            Draw (+1 point each)
          </button>
          
          <button
            on:click={() => showResultButtons = false}
            class="w-full bg-gray-600 hover:bg-gray-500 text-white py-1 px-4 rounded text-sm transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      {/if}
    </div>
  {/if}
</div>