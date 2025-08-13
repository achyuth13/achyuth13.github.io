<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { TournamentService } from '$lib/play/shampionService';
  import { hasValidWriteKey } from '$lib/firebase';
  import type { Tournament } from '$lib/play/shampions';

  export let currentTournament: Tournament;
  export let showDialog = false;
  
  const dispatch = createEventDispatcher();
  
  let totalGames = 9;
  let keepTeams = true;
  let isCreating = false;
  let error = '';

  const gameOptions = [6, 9, 12, 15];

  async function createNewTournament() {
    // Check if we still have valid writeKey
    if (!hasValidWriteKey()) {
      error = 'Invalid or missing write key. Please refresh and try again.';
      return;
    }

    isCreating = true;
    error = '';

    try {
      await TournamentService.startNewTournament(totalGames, keepTeams);
      dispatch('tournamentCreated');
      showDialog = false;
    } catch (err: any) {
      console.error('Tournament creation error:', err);
      
      if (err.code === 'permission-denied') {
        error = 'Permission denied. Please check your write key and try again.';
      } else if (err.message) {
        error = err.message;
      } else {
        error = 'Failed to create new tournament. Please try again.';
      }
    }

    isCreating = false;
  }

  function closeDialog() {
    showDialog = false;
    error = '';
  }
</script>

{#if showDialog}
  <!-- Backdrop -->
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" on:click={closeDialog}></div>
  
  <!-- Dialog -->
  <div class="fixed inset-0 flex items-center justify-center z-50 p-4">
    <div class="bg-gray-900 rounded-xl p-6 w-full max-w-md border border-gray-600">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-bold">Start New Tournament</h3>
        <button on:click={closeDialog} class="text-gray-400 hover:text-white">
          ✕
        </button>
      </div>

      <div class="space-y-4">
        <!-- Current Tournament Summary -->
        <div class="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3">
          <div class="text-sm font-semibold mb-1">Current Tournament #{currentTournament.tournamentNumber || 1}</div>
          <div class="text-xs text-gray-300">
            {currentTournament.matches.filter(m => m.completed).length}/{currentTournament.totalGames} matches completed
          </div>
        </div>

        <!-- Keep Teams Option -->
        <div class="space-y-3">
          <label class="flex items-center gap-3 cursor-pointer">
            <input 
              type="checkbox" 
              bind:checked={keepTeams}
              class="w-4 h-4 text-yellow-400 bg-gray-700 border-gray-600 rounded focus:ring-yellow-400"
            />
            <span class="text-sm">Keep current teams & their total points</span>
          </label>
          
          {#if keepTeams}
            <div class="text-xs text-gray-400 ml-7">
              Team names and total points will be preserved. Only match stats reset.
            </div>
          {:else}
            <div class="text-xs text-gray-400 ml-7">
              Start completely fresh with new team names and zero points.
            </div>
          {/if}
        </div>

        <!-- Games Selection -->
        <div>
          <label class="block text-sm font-medium mb-2">New Tournament Games</label>
          <div class="grid grid-cols-4 gap-2">
            {#each gameOptions as option}
              <button
                on:click={() => totalGames = option}
                class="p-2 rounded border-2 text-sm transition-all {totalGames === option 
                  ? 'border-yellow-400 bg-yellow-400/20 text-yellow-300' 
                  : 'border-gray-600 bg-black/20 hover:border-gray-500'}"
              >
                {option}
              </button>
            {/each}
          </div>
        </div>

        {#if error}
          <div class="bg-red-500/20 border border-red-500/50 rounded p-3 text-red-200 text-sm">
            {error}
          </div>
        {/if}

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-4">
          <button
            on:click={closeDialog}
            class="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-colors"
          >
            Cancel
          </button>
          <button
            on:click={createNewTournament}
            disabled={isCreating}
            class="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 disabled:opacity-50 text-white py-2 px-4 rounded transition-colors"
          >
            {isCreating ? 'Creating...' : 'Start New'}
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}