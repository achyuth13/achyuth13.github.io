<script lang="ts">
  import { onMount } from "svelte";
  import AboutMe from "./about/AboutMe.svelte";

  const sheetUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQsnHAYpWD5aF1k3fGdT2ZFv2jtZ8SklQr4S09EktaI_gS7FJJTL6SEFO4XjEocLvaudRk75MNVp3vf/pub?gid=1903501508&single=true&output=csv";

  interface RowData {
    heading: string;
    punchline: string;
    content: string;
  }

  let data: RowData[] = [];

  async function fetchData(url: string): Promise<RowData[]> {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const text = await response.text();
      const rows = text.split("\n").map((row) => {
        const [heading, punchline, content] = row.split(",");
        return { heading, punchline, content };
      });
      // Remove the first row if it contains column headers
      if (rows.length > 0 && rows[0].heading.toLowerCase() === "heading") {
        rows.shift();
      }
      return rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      return []; // Return empty array or handle error as per your requirement
    }
  }

  onMount(async () => {
    try {
      data = await fetchData(sheetUrl);
      console.log("Data ", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  });
</script>

<div class="flex min-h-screen">
  <div class="max-w-l mx-auto rounded-lg overflow-hidden ">
    <div class="mt-5">
      <div class="text-center">
        <h1 class="text-secondary text-2xl">
          Hey, I'm <a href="/about" class="font-bold text-secondary"
            >Achyuth Nag</a
          >
        </h1>
      </div>
      <div class="text-center mt-4">
        <p class="text-secondary text-lg"> I write
          <a href="/code" class="font-semibold">code</a>,
          <a href="/music" class="font-semibold">music</a> and
          <a href="/stories" class="font-semibold">stories</a>, not in that particular order.
        </p>
        <hr class="my-4 border-t border-secondary">
      </div>
    </div>
    <AboutMe />
  </div>
</div>


<!-- Background HTML -->
<!-- <div class="flex min-h-screen bg-[url('/pattern-5-cropped-3.svg')] bg-cover bg-bottom"></div> -->

<!-- Sheets integration code -->
        <!-- <div class="text-white">
          {#if data.length > 0}
            {#each data as row}
              <div>
                <h2>{row.heading}</h2>
                <p><strong>{row.punchline}</strong></p>
                <p>{row.content}</p>
              </div>
            {/each}
          {:else}
            <p>Loading...</p>
          {/if}
        </div> -->
<!-- <style>
    .bg-hover-svg {
        background-image: url('/pattern-2.png');
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        opacity: 0;
    }
    .group:hover .bg-hover-svg {
        opacity: 0.3;
    }
</style> -->
