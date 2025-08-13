<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { setWriteKey, hasValidWriteKey } from '$lib/firebase';

  const dispatch = createEventDispatcher();
  
  let writeKey = '';
  let error = '';
  let isValidating = false;

  function validateWriteKey() {
    if (!writeKey) {
      error = 'Please enter a write key';
      return;
    }

    const numKey = parseInt(writeKey);
    if (isNaN(numKey)) {
      error = 'Please enter a valid number';
      return;
    }

    isValidating = true;
    setWriteKey(numKey);
    
    if (hasValidWriteKey()) {
      dispatch('authenticated');
    } else {
      error = 'Invalid write key. Please try again.';
      setWriteKey(0); // Clear invalid key
    }
    isValidating = false;
  }

  function handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      validateWriteKey();
    }
  }
</script>

<div class="max-w-md mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
  <div class="text-center mb-6">
    <div class="text-4xl mb-4">🔐</div>
    <h2 class="text-2xl font-bold mb-2">Authentication Required</h2>
    <p class="text-gray-300">Enter your write key to access the tournament</p>
  </div>

  <div class="space-y-4">
    <div>
      <label for="writeKey" class="block text-sm font-medium mb-2">Write Key</label>
      <input
        id="writeKey"
        type="number"
        bind:value={writeKey}
        on:keypress={handleKeyPress}
        placeholder="Enter your write key"
        class="w-full px-4 py-3 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
        disabled={isValidating}
      />
    </div>

    {#if error}
      <div class="bg-red-500/20 border border-red-500/50 rounded-lg p-3 text-red-200 text-sm">
        {error}
      </div>
    {/if}

    <button
      on:click={validateWriteKey}
      disabled={isValidating || !writeKey}
      class="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold py-3 px-6 rounded-lg hover:from-yellow-300 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
    >
      {isValidating ? 'Validating...' : 'Access Tournament'}
    </button>
  </div>

  <div class="mt-6 text-center text-xs text-gray-400">
    Contact the tournament organizer if you need a write key
  </div>
</div>