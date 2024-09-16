<script lang="ts">
    import '../app.css';
</script>

<div class="app flex bg- flex-col justify-between bg-primary font-dk-serif">
    <main class="flex-1">
        <slot />
    </main>
    <footer class="py-2 flex items-center justify-center sticky bottom-0 dk-serif">
        <div class="font-serif text-white">
            <span class="italic">Written in <a href="https://kit.svelte.dev" class="italic">Svelte</a></span> 
            <span class="text-xl">&hearts;</span>
          </div>          
    </footer>
</div>

<!-- <div class="corner fixed top-0 z-10 p-4">
        <audio controls class="opacity-12">
            <source src="manshere.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    </div> -->
