<script lang="ts">
  import { blogsData } from "./blogs";
  
  let blogs = blogsData;
</script>

<div class="min-h-screen bg-[url('/sunset.jpg')] sm:bg-contain sm:bg-right bg-contain">
  <h1 class="relative top-4 left-4 text-7xl text-secondary font-bold">Blogs</h1>
  <div class="mt-16 p-4 rounded-md shadow-lg max-w-2xl">
    <ul class="list-disc pl-5 space-y-4">
      {#each blogs as { date, name, url }}
        <li>
          <span class="text-gray-600">{date}</span> - <a href="{url}" class="text-secondary hover:underline">{name}</a>
        </li>
      {/each}
    </ul>
  </div>
</div>
