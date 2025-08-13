<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { TournamentService } from '$lib/play/shampionService';
  
  export let existingTeams: any[] = [];
  
  const dispatch = createEventDispatcher();
  
  let teams = [
    { id: 'team1', name: '', players: ['', ''] },
    { id: 'team2', name: '', players: ['', ''] },
    { id: 'team3', name: '', players: ['', ''] }
  ];
  
  let isLoading = false;
  let error = '';
  
  // Pre-fill if teams already exist
  $: if (existingTeams.length > 0) {
    teams = existingTeams.map(team => ({
      id: team.id,
      name: team.name,
      players: [...team.players]
    }));
  }
  
  async function saveTeamSetup() {
    // Validate all fields are filled
    const isValid = teams.every(team => 
      team.name.trim() && 
      team.players.every(player => player.trim())
    );
    
    if (!isValid) {
      error = 'Please fill in all team names and player names';
      return;
    }
    
    isLoading = true;
    error = '';
    
    try {
      await TournamentService.saveTeamSetup(teams);
      dispatch('teamsConfigured');
    } catch (err) {
      error = 'Failed to save team setup';
      console.error(err);
    }
    
    isLoading = false;
  }
</script>

<div class="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
  <div class="text-center mb-8">
    <div class="text-6xl mb-4">👥</div>
    <h2 class="text-3xl font-bold mb-2">Team Setup</h2>
    <p class="text-gray-300">Configure your teams and players</p>
  </div>

  <div class="space-y-6">
    {#each teams as team, teamIndex}
      <div class="bg-black/30 rounded-lg p-6 border border-gray-600">
        <h3 class="text-lg font-semibold mb-4 text-yellow-400">Team {teamIndex + 1}</h3>
        
        <!-- Team Name -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Team Name</label>
          <input
            bind:value={team.name}
            placeholder="Enter team name..."
            class="w-full bg-black/50 border border-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
        </div>

        <!-- Players -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each team.players as player, playerIndex}
            <div>
              <label class="block text-sm font-medium mb-2">Player {playerIndex + 1}</label>
              <input
                bind:value={team.players[playerIndex]}
                placeholder="Enter player name..."
                class="w-full bg-black/50 border border-gray-500 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              />
            </div>
          {/each}
        </div>
      </div>
    {/each}

    {#if error}
      <div class="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200">
        {error}
      </div>
    {/if}

    <button
      on:click={saveTeamSetup}
      disabled={isLoading}
      class="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-400 hover:to-purple-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
    >
      {isLoading ? 'Saving Teams...' : existingTeams.length > 0 ? 'Update Teams' : 'Save Teams'}
    </button>
  </div>
</div>