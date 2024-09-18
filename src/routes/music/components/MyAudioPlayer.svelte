<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { audioData } from '../data/audioData';
  
  import TrackHeading from './TrackHeading.svelte';
  import ProgressBarTime from './ProgressBarTime.svelte';
  import Controls from './Controls.svelte';
  import VolumeSlider from './VolumeSlider.svelte';
  import PlayList from './PlayList.svelte';
  
  let trackIndex: number = 0;
  let audioFile: HTMLAudioElement;
  let trackTitle: string = 'Loading...';
  let totalTrackTime: number = 0;
  let totalTimeDisplay: string = "loading...";
  let currTimeDisplay: string = "0:00:00";
  let progress: number = 0;
  let trackTimer: number | undefined;
  let isPlaying: boolean = false;
  let vol: number = 50;

  function loadTrack(): void {
    audioFile = new Audio(audioData[trackIndex].url);
    audioFile.onloadedmetadata = () => {
      totalTrackTime = audioFile.duration;
      updateTotalTimeDisplay(); // Ensure total time display is updated after metadata is loaded
      updateTime(); // Update current time
    };
    audioFile.ontimeupdate = updateTime; // Ensure time is updated as it plays
    trackTitle = audioData[trackIndex].name;
  }

  function updateTotalTimeDisplay(): void {
  if (isNaN(totalTrackTime) || totalTrackTime === 0) {
    totalTimeDisplay = "00:00:00"; // Default display if duration is invalid
    return;
  }

  let durHrs = Math.floor(totalTrackTime / 3600);
  let durMins = Math.floor((totalTrackTime % 3600) / 60);
  let durSecs = Math.floor(totalTrackTime % 60);

  totalTimeDisplay = `${durHrs}:${durMins < 10 ? `0${durMins}` : durMins}:${durSecs < 10 ? `0${durSecs}` : durSecs}`;
}

function updateTime(): void {
  if (totalTrackTime === 0) return; // Prevent division by zero if no track loaded
  progress = audioFile.currentTime * (100 / totalTrackTime);

  let currHrs = Math.floor(audioFile.currentTime / 3600);
  let currMins = Math.floor((audioFile.currentTime % 3600) / 60);
  let currSecs = Math.floor(audioFile.currentTime % 60);

  currTimeDisplay = `${currHrs}:${currMins < 10 ? `0${currMins}` : currMins}:${currSecs < 10 ? `0${currSecs}` : currSecs}`;
}


  function toggleTimeRunning(): void {
    if (audioFile.ended) {
      isPlaying = false;
      clearInterval(trackTimer);
    } else {
      trackTimer = setInterval(updateTime, 100);
    }
  }

  function playPauseAudio(): void {
    if (audioFile.paused) {
      toggleTimeRunning();
      audioFile.play();
      isPlaying = true;
    } else {
      toggleTimeRunning();
      audioFile.pause();
      isPlaying = false;
    }
  }

  function rewindAudio(): void {
    audioFile.currentTime -= 10;
  }

  function forwardAudio(): void {
    audioFile.currentTime += 10;
  }

  function adjustVol(): void {
    audioFile.volume = vol / 100;
  }

  function handleTrack(e: Event): void {
    const target = e.target as HTMLElement;
    if (!isPlaying) {
      trackIndex = Number(target.dataset.trackId);
      loadTrack();
      playPauseAudio();
    } else {
      isPlaying = false;
      audioFile.pause();
      trackIndex = Number(target.dataset.trackId);
      loadTrack();
      playPauseAudio();
    }
  }

  function resetTrack(): void {
    if (audioFile) {
      audioFile.pause();
      audioFile.currentTime = 0; // Reset the current time to the start
      isPlaying = false;
      clearInterval(trackTimer);
      trackTimer = undefined; // Ensure timer is cleared
    }
    // Optionally set trackIndex back to a default or previous track
  }


  function handlePopState(event: PopStateEvent) {
    resetTrack();
  }

  onMount(() => {
    loadTrack();
    if (typeof window !== 'undefined') {
      window.addEventListener('popstate', handlePopState);
    }  
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('popstate', handlePopState);
    }
  });
</script>

<div class="relative flex flex-col items-center justify-center min-h-screen p-4 bg-[url('/img/cherry_blossom.jpeg')] bg-cover bg-no-repeat bg-opacity-70">
  <h1 class="absolute top-4 left-4 text-7xl text-primary font-bold">Music</h1>
  <div class="relative flex flex-col items-center justify-center p-4">
    <div class="absolute inset-0 bg-secondary bg-opacity-80 rounded-lg"></div>
    <div class="relative text-center text-primary bg-opacity-70 p-1 rounded-lg">
      <h2 class="text-md md:text-2xl font-bold mb-2">The playlist contains my originals and my covers of famous songs</h2>
      <p class="text-sm">Click on the playlist to choose and play your favourite track!</p>
  </div>
</div>

  <section id="player-cont" class="mt-8">
    <TrackHeading {trackTitle} />
    <ProgressBarTime {currTimeDisplay} {totalTimeDisplay} {progress} />
    <Controls {isPlaying} 
      on:rewind={rewindAudio}
      on:playPause={playPauseAudio}
      on:forward={forwardAudio} 
    />
    <VolumeSlider bind:vol on:input={adjustVol} />  
  </section>
  
  <PlayList on:click={handleTrack} />
  <div class="absolute bottom-8 left-0 right-0 flex justify-center">
        <div class="text-sm sm:text-base font-bold text-secondary">
          <a href="mailto:achyuth@nagadelic.me" role="button">achyuth@nagadelic.me</a>
        </div>
      </div>
</div>

<style>
  #player-cont {
    width: 250px;
    height: 165px;
    padding: .7rem 1.5rem 0;
    box-shadow: 0 0 5px black;
    background: #99FED1;
    color: darkblue;
    border-radius: 5px 5px 0 0;
    margin-bottom: 20px;
  }   
</style>
