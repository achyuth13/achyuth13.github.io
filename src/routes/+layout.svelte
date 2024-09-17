<script lang="ts">
    import '../app.css';
</script>

<div class="app flex flex-col justify-between bg-primary font-dk-serif select-none">
    <main class="flex-1 overflow-auto">
        <slot />
    </main>
    <footer class="py-2 flex items-center justify-center sticky bottom-0 dk-serif overflow-hidden">
        <div class="font-serif text-white">
            <span class="italic">Written in <a href="https://kit.svelte.dev" class="italic">Svelte</a></span> 
          </div>          
    </footer>
</div>
