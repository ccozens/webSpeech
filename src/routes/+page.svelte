<!-- script -->
<script lang="ts">
	import { onMount } from 'svelte';
	/*
	 * Check for browser support
	 */
	let supportMsg: HTMLDivElement;

	onMount(async () => {
		if ('speechSynthesis' in window) {
			supportMsg.innerHTML = 'Your browser <strong>supports</strong> speech synthesis.';
		} else {
			supportMsg.innerHTML =
				'Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="https://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.';
			supportMsg.classList.add('not-supported');
		}
	});

	// create voice and voices vars
	let voice: SpeechSynthesisVoice;
	let voices: SpeechSynthesisVoice[] = [];
	// get the list of voices
	async function loadVoices() {
		// fetch the available voices.
		voices = speechSynthesis.getVoices();
		// set default voice as first in list
		voice = voices[0];
		return voices;
	}

	// create speech message (speechMsg) and set default value
	let speechMsg: string = 'Hello world';
	// create vars for volume, rate and pitch
	let volume: number = 0.8; // 0 to 1
	let rate: number = 1; // 0.1 to 10
	let pitch: number = 1; //0 to 2

	function speak(speechMsg: string) {
		speechSynthesis.cancel();
		// create utterance
		const utterance = new SpeechSynthesisUtterance(speechMsg);
		// set utterance properties
		utterance.voice = voice;
		utterance.volume = volume;
		utterance.rate = rate;
		utterance.pitch = pitch;

		speechSynthesis.speak(utterance);
	}

	function speakOnClick() {
		speak(speechMsg);
	}
</script>

<svelte:head>
	<title>Web Speech Synthesis Demo</title>
</svelte:head>

<!-- html -->
<div id="page-wrapper">
	<h1>Web Speech Synthesis Demo</h1>

	<div bind:this={supportMsg} class="msg" />
	<form>
		<input type="text" bind:value={speechMsg} placeholder={speechMsg} />

		<div class="option">
			<label for="voice">Voice</label>
			{#await loadVoices()}
				<p>loading voices...</p>
			{:then voices}
				<select bind:value={voice}>
					{#each voices as voice}
						<option value={voice}>{voice.name} | {voice.lang}</option>
					{/each}
				</select>
			{/await}
		</div>

		<div class="option">
			<label for="volume">Volume</label>
			<input type="range" min="0" max="1" step="0.1" bind:value={volume} />
		</div>
		<div class="option">
			<label for="rate">Rate</label>
			<input type="range" min="0.1" max="10" step="0.1" bind:value={rate} />
		</div>
		<div class="option">
			<label for="pitch">Pitch</label>
			<input type="range" min="0" max="2" step="0.1" bind:value={pitch} />
		</div>
	</form>

	<button on:click={speakOnClick}>Speak</button>
</div>

<div class="credit">
	<p>
		This demo is based on <a href="https://codepen.io/matt-west/pen/DpmMgE"
			>this web speech CodePen by Matt West</a
		> and adapted to svelte.
	</p>
	<p>
		There is also <a href="https://svelte.dev/repl/b1dd771bc0554184bedf2ea2f4c4a47e?version=4.2.0"
			>svelte REPL JavaScript version</a
		>.
	</p>
</div>

<style>
	*,
	*:before,
	*:after {
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		font-family: Helvetica, Arial, sans-serif;
	}

	#page-wrapper {
		width: 640px;
		background: #ffffff;
		padding: 1em;
		margin: 1em auto;
		border-top: 5px solid #498b50;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
	}

	h1 {
		margin-top: 0;
	}

	.msg {
		font-size: 0.9em;
		line-height: 1.4em;
	}

	.msg.not-supported {
		color: #cc0000;
	}

	input[type='text'] {
		width: 100%;
		padding: 0.5em;
		font-size: 1.2em;
		border-radius: 3px;
		border: 1px solid #d9d9d9;
		box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1) inset;
	}

	input[type='range'] {
		width: 300px;
	}

	label {
		display: inline-block;
		float: left;
		width: 150px;
	}

	.option {
		margin: 1em 0;
	}

	button {
		display: inline-block;
		border-radius: 3px;
		border: none;
		font-size: 0.9rem;
		padding: 0.5rem 0.8em;
		background: #10e325e1;
		border-bottom: 1px solid #498b50;
		color: #05340a;
		-webkit-font-smoothing: antialiased;
		font-weight: bold;
		margin: 0;
		width: 100%;
		text-align: center;
	}

	button:hover,
	button:focus {
		opacity: 0.75;
		cursor: pointer;
	}

	button:active {
		opacity: 1;
		box-shadow: 0 -3px 10px rgba(0, 0, 0, 0.1) inset;
	}

	.credit {
		margin: 2em auto;
		text-align: center;
	}

	.credit > p {
		margin: 0.3em;
	}
</style>
