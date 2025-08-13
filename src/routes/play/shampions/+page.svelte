<script lang="ts">
  import { onMount } from "svelte";
  import { TournamentService } from "$lib/play/shampionService";
  import { hasValidWriteKey } from "$lib/firebase";
  import WriteKeyAuth from "./components/WriteKeyAuth.svelte";
  import Leaderboard from "./components/Leaderboard.svelte";
  import MatchSchedule from "./components/MatchSchedule.svelte";
  import TournamentSetup from "./components/TournamentSetup.svelte";
  import TeamSetup from './components/TeamSetup.svelte';
  import type { Tournament } from "$lib/play/shampions";

  let tournament: Tournament | null = null;
  let loading = true;
  let isAuthenticated = false;
  let setupCollapsed = false;
  let teamConfig: any[] = [];
  let showTeamSetup = false;

  onMount(() => {
    isAuthenticated = hasValidWriteKey();

    if (isAuthenticated) {
      loadData();
    } else {
      loading = false;
    }
  });

  async function loadData() {
    // Load both tournament and team config
    const [tournamentData, configData] = await Promise.all([
      TournamentService.getTournament(),
      TournamentService.getTeamConfig()
    ]);
    
    tournament = tournamentData;
    teamConfig = configData;
    
    // Show team setup if no config exists
    showTeamSetup = configData.length === 0;
    loading = false;
    
    // Subscribe to real-time updates
    TournamentService.subscribeToTournament((data) => {
      tournament = data;
      if (data && data.status === 'active') {
        setupCollapsed = true;
      }
    });
  }

  function handleAuthenticated() {
    isAuthenticated = true;
    loadData();
  }

  function handleTournamentCreated() {
    loadData();
  }

  function toggleSetup() {
    setupCollapsed = !setupCollapsed;
  }

  function handleTeamsConfigured() {
    showTeamSetup = false;
    loadData(); // Reload to get updated config
  }

  function openTeamSetup() {
    showTeamSetup = true;
  }
</script>

<div
  class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white"
>
  <div class="container mx-auto px-4 py-8">
    <header class="text-center mb-12">
      <h1
        class="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent mb-4"
      >
        We are the Shampions
      </h1>
    </header>

    {#if !isAuthenticated}
      <WriteKeyAuth on:authenticated={handleAuthenticated} />
    {:else if loading}
      <div class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
      </div>
    {:else if showTeamSetup}
      <!-- Team Setup Phase -->
      <TeamSetup 
        existingTeams={teamConfig}
        on:teamsConfigured={handleTeamsConfigured}
      />
    {:else}
      <!-- Normal Tournament Flow -->
      <div class="mb-8">
        <TournamentSetup
          {tournament}
          {setupCollapsed}
          on:tournamentCreated={handleTournamentCreated}
          on:toggleCollapse={toggleSetup}
        />
      </div>

      <!-- Add button to edit teams -->
      <div class="mb-8 text-center">
        <button
          on:click={openTeamSetup}
          class="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded-lg transition-all duration-200"
        >
          ⚙️ Edit Teams
        </button>
      </div>

      <!-- Show matches ONLY if tournament is active (not completed) -->
      {#if tournament && tournament.status === "active"}
        <div class="mb-8">
          <MatchSchedule matches={tournament.matches} teams={tournament.teams} />
        </div>
      {/if}

      <!-- Show final leaderboard ONLY when tournament is completed -->
      {#if tournament && tournament.status === "completed"}
        <div class="mb-8">
          <Leaderboard
            teams={tournament.teams}
            {tournament}
            on:newTournament={handleTournamentCreated}
          />
        </div>
      {/if}
    {/if}
  </div>
</div>
