<script>
	import { audioData } from "../data/audioData";
	
	let listIsShowing = false;
	
	const showPlayList = () => listIsShowing = !listIsShowing
</script>


<section id="playlist-cont">
	<button class="accordion"
					class:active={listIsShowing}
					on:click={showPlayList}>&#9776; Playlist</button>

	<ul class:show-list={listIsShowing}>
		{#each audioData as {name, url}, i}
		<li data-track-id={i}
				on:click>
			{name}</li>
		{/each}
	</ul>
</section>


<style>
	section#playlist-cont {
		width: 298px;	
		box-shadow: 0 0 5px #222;
		border-radius: 0 0 5px 5px;
		background: #99FED1;
	}
	
	/* Style the buttons that are used to open and close the accordion panel */
	button.accordion {		
		background: #99FED1;
		color: darkblue;
		margin: 0;
		padding: 5px 15px;
		width: 100%;
/* 		text-align: left; */
		border: none;
		outline: none;
		cursor: pointer;
		transition: 0.4s;
	}

	/* Add a background color to the button if it is clicked on (add the .active class with JS), and when you move the mouse over it (hover) */
	button.active {
		background-color: #99FED1;
		color: darkblue;
	}
	
	ul {
		list-style-type: none;
		background: #99FED1;
		color: darkblue;
		margin: 0;
		padding: 0;
		border-radius: 0 0 5px 5px;
		height: 0;
		overflow: auto;
		transition: height .3s;
	}
	
	li {
		line-height: 150%;
		padding: 5px 5px 5px 20px;
		border-bottom: 1px solid darkblue;
		cursor: pointer;
	}
	
	li:active, li:hover {
		background-color: lightcyan;
	}
	
	.show-list {
		height: 150px;
	}
</style>