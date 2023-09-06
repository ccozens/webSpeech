<!-- script -->
<script lang="ts">
	import { onMount } from 'svelte';
	import GithubCorner from '$lib/components/GithubCorner.svelte';
	import { parseUserAgent } from '$lib/functions/parseUserAgent.js';
	import type { Device } from '$lib/types';

	// access data for page visits and user agent
	export let data;
	/*
	 * Check for browser support
	 */
	let supportMsg: HTMLDivElement;

	// create voice and voices vars
	let voice: SpeechSynthesisVoice;
	let voices: SpeechSynthesisVoice[] = [];

	// get the list of voices
	async function loadVoices() {
		return new Promise<SpeechSynthesisVoice[]>((resolve) => {
			speechSynthesis.onvoiceschanged = () => {
				const voices = speechSynthesis.getVoices();
				resolve(voices);
			};
		});
	}

	let device: Device = parseUserAgent(data.userAgent);
	// load voices and parse user agent on mount

	onMount(async () => {
		if ('speechSynthesis' in window) {
			supportMsg.innerHTML = 'Your browser <strong>supports</strong> speech synthesis.';
			voices = await loadVoices();
			voice = voices[0];
		} else {
			supportMsg.innerHTML =
				'Sorry your browser <strong>does not support</strong> speech synthesis.<br>Try this in <a href="https://www.google.co.uk/intl/en/chrome/browser/canary.html">Chrome Canary</a>.';
			supportMsg.classList.add('not-supported');
		}
	});

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

	function blankInput() {
		speechMsg = '';
	}
</script>

<svelte:head>
	<title>Web Speech Synthesis Demo</title>
</svelte:head>

<!-- html -->
<div id="page-wrapper">
	<h1>Web Speech Synthesis Demo</h1>

	<div bind:this={supportMsg} class="msg" />
	{#if device.type === 'desktop'}
		<div class="msg">You're browsing on {device.name}, so this should work fine.</div>
	{:else if device.type === 'mobile'}
		<div class="msg">
			However, you're browsing on {device.name}, so this might not work. Mobile devices have often have
			custom text-to-speech accessibility features, so this likely won't behave. For example, on my
			Android phone, the voice list is different to my MacBook Pro and the voice selection does not
			work.
		</div>
	{/if}
	
	<form>
		<input type="text" bind:value={speechMsg} on:click={blankInput} />

		<div class="option">
			<label for="voice">Voice</label>
			<select bind:value={voice}>
				{#if voices}
					{#each voices as voice}
						<option value={voice}>{voice.name} | {voice.lang}</option>
						{voice.name}
					{/each}
				{:else}
					<option value="">No voices loaded</option>
				{/if}
			</select>
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
	<div class="visits">
		<span class="visitNumber">{data?.pageVisits}</span> page visits since 5th Sep 2023.
	</div>
</div>

<GithubCorner />

{#each voices as voice}
	<p>{voice.name}</p>
	<p>{voice.lang}</p>
{/each}

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
		display: flex;
		flex-direction: column;
		background: #ffffff;
		padding: 1em;
		margin: 1em auto;
		border-top: 5px solid #498b50;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
	}

	h1 {
		margin-top: 0;
		text-align: center;
	}

	.msg {
		font-size: 0.9em;
		line-height: 1.4em;
	}

	.msg.not-supported {
		color: #cc0000;
	}

	.visitNumber {
		font-weight: bold;
	}

	form {
		margin: 1em 0;
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
		/* display: inline-block; */
		border-radius: 3px;
		border: none;
		font-size: 0.9rem;
		padding: 0.5rem 0.8em;
		background: #10e325e1;
		border-bottom: 1px solid #498b50;
		color: #05340a;
		-webkit-font-smoothing: antialiased;
		font-weight: bold;
		margin: 0 auto;
		width: 90%;
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

	@media (max-width: 640px) {
		#page-wrapper {
			width: 90%;
			margin: 0 auto;
			border-bottom: 1px solid #498b50;
			box-shadow: none;
			border-top: none;
		}
	}
</style>
