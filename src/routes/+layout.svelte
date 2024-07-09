<script lang="ts">
    import '../app.css';
</script>

<div class="app bg-primary flex flex-col justify-between min-h-screen">
    <main class="flex-1">
        <slot />
    </main>
    <footer class="py-2 flex items-center justify-center sticky bottom-0  text-white">
            <div class="text-secondary">
                Written in <a href="https://kit.svelte.dev">Svelte</a> &hearts;
            </div>
    </footer>
</div>
