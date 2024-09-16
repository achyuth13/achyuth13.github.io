<script>
    import { onMount } from 'svelte';
    import { Howl } from 'howler';

    /**
   * @type {Howl | null}
   */
    let sound = null; // Initialize sound to null
    let trackIndex = 0;
    let isPlaying = false;
    /**
   * @type {number | null}
   */
    let currentPlayingIndex = null;

    const tracks = [
        { src: '/kabali.mp3', name: 'Song One' },
        { src: '/kabali.mp3', name: 'Song Two' }
    ];

    onMount(() => {
        loadTrack();
    });

    /**
   * @param {number | null} index
   */
    function play(index) {
        if (currentPlayingIndex !== null && currentPlayingIndex !== index) {
            if (sound) {
                sound.stop();
                sound.unload();
            }
            
        }

        // Set the track index and load the track
        trackIndex = index || 0;
        loadTrack();
        if (sound) {
            sound.play();
        }
        isPlaying = true;
        currentPlayingIndex = index;
    }

    function pause() {
        if (sound) {
            sound.pause();
            isPlaying = false;
        }
    }

    function prevTrack() {
        trackIndex = (trackIndex > 0) ? trackIndex - 1 : tracks.length - 1;
        loadTrack();
        if (sound) {
            sound.play();
        }
    }

    function nextTrack() {
        trackIndex = (trackIndex < tracks.length - 1) ? trackIndex + 1 : 0;
        loadTrack();
        if (sound) {
            sound.play();
        }
    }

    function loadTrack() {
        if (sound) {
            sound.stop();
            sound.unload();
        }

        sound = new Howl({
            src: [tracks[trackIndex].src],
            html5: true,
            onend: nextTrack // Automatically play the next track when the current one ends
        });
    }

    $: currentTrackName = tracks[trackIndex]?.name || 'Unknown Track';
</script>

<style>
    .music-player {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        width: 100vw;
        background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/background-image.jpg') no-repeat center center;
        background-size: cover;
        color: #fff;
        text-align: center;
        padding: 2rem;
    }

    .player-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-top: 1rem;
    }

    .control-button {
        background-color: #555;
        border: none;
        color: white;
        padding: 1rem 2rem;
        cursor: pointer;
        border-radius: 8px;
        font-size: 1.25rem;
        transition: background-color 0.3s;
    }

    .control-button:hover {
        background-color: #777;
    }

    .track-info {
        margin-bottom: 2rem;
    }

    .track-info h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    .playlist {
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    }

    .playlist-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #333;
    }

    .playlist-item:last-child {
        border-bottom: none;
    }

    .playlist-item button {
        background-color: #555;
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        cursor: pointer;
        border-radius: 8px;
        font-size: 1rem;
        transition: background-color 0.3s;
    }

    .playlist-item button:hover {
        background-color: #777;
    }
</style>

<div class="music-player">
    <div class="track-info">
        <h2>Now Playing</h2>
        <p class="text-lg">{currentTrackName}</p>
    </div>

    <div class="playlist">
        {#each tracks as track, index}
            <div class="playlist-item">
                <span>{track.name}</span>
                <button on:click={() => {
                    if (currentPlayingIndex === index && isPlaying) {
                        pause();
                        currentPlayingIndex = null; // Reset the current playing index
                    } else {
                        play(index);
                    }
                }}>
                    {#if currentPlayingIndex === index && isPlaying} Pause {:else} Play {/if}
                </button>
            </div>
        {/each}
    </div>
</div>
