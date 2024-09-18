<script lang="ts">
    import '../app.css';
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<div class="flex flex-col min-h-screen bg-black font-dk-serif select-none">
    <main class="flex-1 overflow-auto">
        <slot />
    </main>
    <footer class="py-2 flex flex-col items-center justify-center bg-black text-white">
        <a class="font-bold text-white" href="mailto:achyuth@nagadelic.me" role="button">achyuth@nagadelic.me</a>
        <div class="font-serif">
            <span class="italic">Written in <a href="https://kit.svelte.dev" class="italic">Svelte</a></span> 
        </div>
    </footer>
</div>
