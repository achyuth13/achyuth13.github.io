<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';


  onMount(() => {
      const expandableTiles = document.querySelectorAll(".expandable-tile");

      expandableTiles.forEach(tile => {
          tile.addEventListener("mouseenter", function() {
              if (tile.textContent === "C") {
                  tile.textContent = "Code";
              } else if (tile.textContent === "&#9835;") {
                  tile.textContent = "Music";
              } else if (tile.textContent === "📚") {
                  tile.textContent = "Stories";
              }
          });

          tile.addEventListener("mouseleave", function() {
              if (tile.textContent === "Code") {
                  tile.textContent = "C";
              } else if (tile.textContent === "Music") {
                  tile.textContent = "M";
              } else if (tile.textContent === "Stories") {
                  tile.textContent = "📚";
              }
          });
      });
  });

  /**
 * @param {string | URL} path
 */
  function navigateTo(path) {
      goto(path);
  }
</script>

<div class="bg-[url('/pattern-5-cropped-3.svg')] bg-cover bg-top z-0">
  <nav
    class="fixed top-0 right-0 left-0 bg-primary text-secondary px-6 py-4 flex justify-end items-center z-10 font-bold"
  >
    <a href="/contact" class="hover:text-gray-300 transition-colors duration-300"
      >Talk To Me</a
    >
  </nav>
  <div class="min-h-screen flex justify-between items-center">
    <div class="flex flex-col text-secondary ml-12">
      <h1 class="text-8xl pb-10">Achyuth Nag</h1>
      <div class="text-lg">
        <p class="mb-4">Bangalorean</p>
        <p class="mb-4">
          SDE-1 @ Nuclei, All things frontend - Android and Svelte
        </p>
        <p class="mb-4">Violinist, Musician @ Caramel Chutney</p>
        <p class="mb-4">Writer @ Caramel Chutney Productions</p>
      </div>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="flex justify-between items-center text-secondary-shade font-bold pr-20">
      <div class="w-auto h-80 bg-primary rounded-md px-4 py-20 flex justify-center items-center tiles mx-2 text-2xl expandable-tile hover:bg-[url('/sunset.jpg')] bg-cover bg-top transition-colors duration-500" on:click={() => navigateTo('/code')}>{"{;}"}</div>
      <div class="w-auto h-80 bg-primary rounded-md px-4 py-20 flex justify-center items-center mx-2 text-2xl expandable-tile hover:bg-[url('/sunset.jpg')] bg-cover bg-top transition-colors duration-500" on:click={() => navigateTo('/music')}>&#9835;</div>
      <div class="w-auto h-80 bg-primary rounded-md px-4 py-20 mx-2 flex justify-center items-center text-2xl expandable-tile hover:bg-[url('/sunset.jpg')] bg-cover bg-top transition-colors duration-500" on:click={() => navigateTo('/stories')}> 📚 </div>
    </div>
  </div>
</div>


<style>
  .tiles {
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .expandable-tile {
      cursor: pointer;
      will-change: transform;
      transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); /* Default ease-out */
  }

  .expandable-tile:hover {
      transform: scaleX(1.1);
      transition: transform 0.4s cubic-bezier(0.42, 0, 0.58, 1); /* Ease-in */
  }
</style>