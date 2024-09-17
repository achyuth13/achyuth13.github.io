<script lang="ts">
    import {storiesData} from './stories.js';
    import { writable } from 'svelte/store';
  
    let stories = storiesData;
  
    // Reactive store to track the expanded state of each card
    let expandedStates = writable(stories.map(() => false));
  
    // Toggle the expansion of a specific card
    function toggleExpand(index: number): void {
      expandedStates.update(states => {
        states[index] = !states[index];
        return [...states];
      });
    }
  </script>
  
  <div class="min-h-screen bg-[url('/boat.jpeg')] bg-cover bg-center">
    <h1 class="text-4xl text-secondary text-center py-8">This is Stories</h1>
  
    <div class="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {#each stories as { heading, content }, index}
        {#key index}
          <div class="bg-white rounded-lg shadow-lg p-4 flex flex-col space-y-2 overflow-hidden transition-all duration-300" style:height={$expandedStates[index] ? 'auto' : '12rem'}>
            <h2 class="text-xl font-semibold text-primary">{heading}</h2>
            <p class="text-gray-700 overflow-hidden">
              {$expandedStates[index] ? content : `${content.substring(0, 100)}...`}
            </p>
            <button
              class="text-blue-500 hover:text-blue-700 mt-2"
              on:click={() => toggleExpand(index)}>
              {$expandedStates[index] ? 'Read less' : 'Read more'}
            </button>
          </div>
        {/key}
      {/each}
    </div>
  </div>
  