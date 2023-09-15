export function speak(
	speechMsg: string,
	voice: SpeechSynthesisVoice,
	volume: number,
	rate: number,
	pitch: number
) {
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
