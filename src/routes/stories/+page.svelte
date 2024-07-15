<div class="relative">
  <div class="absolute inset-0 bg-[url('/pattern-5-cropped-3.svg')] bg-cover bg-top z-0"></div>
  <nav class="fixed top-0 right-0 left-0 bg-primary text-secondary px-6 py-4 flex justify-end items-center z-10 font-bold">
    <a href="/" class="mr-6 hover:text-gray-300 transition-colors duration-300">Code</a>
    <a href="/" class="mr-6 hover:text-gray-300 transition-colors duration-300">Music</a>
    <a href="/" class="mr-6 hover:text-gray-300 transition-colors duration-300">Stories</a>
    <a href="/" class="hover:text-gray-300 transition-colors duration-300">Talk To Me</a>
  </nav>

  <div class="min-h-screen flex items-center justify-start mt-10 ml-10 text-secondary relative z-10">
    <div class="flex flex-col">
      <h1 class="text-8xl pb-10">Achyuth Nag</h1>
      <div class="text-lg">
        <p class="mb-4">Bangalorean</p>
        <p class="mb-4">
          SDE-2 @ Nuclei, All things frontend - Android and Svelte
        </p>
        <p class="mb-4">Violinist, Musician @ Caramel Chutney</p>
        <p class="mb-4">Writer @ Caramel Chutney Productions</p>
      </div>
    </div>

    <div class="flex">
        <img src="/cherry_blossom.jpeg" alt="" class="image-hover-effect">
        <img src="/cherry_blossom.jpeg" alt="" class="image-hover-effect">
        <img src="/cherry_blossom.jpeg" alt="" class="image-hover-effect">
    </div>
  </div>
</div>

<style>
    .image-container {
      display: flex;
    }
  
    .image-hover-effect {
      width: 10px; /* Initial smaller size */
      height: auto; /* Adjust height to match the aspect ratio you want */
      transition: transform 0.8s ease; /* Smooth transition effect */
      background-size: contain; /* Cover the entire container with the background */
      background-position: center; /* Center the background image */

    }
  
    .image-hover-effect:hover {
      width: 100px; /* Initial smaller size */
      height: auto; /* Adjust height to match the aspect ratio you want */
      transform: scale(1.2); /* Scale up to 120% on hover */
    }
  </style>