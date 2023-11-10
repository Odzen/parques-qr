<script>
	import { Html5Qrcode } from 'html5-qrcode';
	import { onMount } from 'svelte';

	export let decodedTextQr = '';
	export let scanning = true;

	let html5Qrcode;

	onMount(init);

	function init() {
		html5Qrcode = new Html5Qrcode('reader');
		start();
	}

	function start() {
		html5Qrcode.start(
			{ facingMode: 'environment' },
			{
				fps: 10,
				qrbox: { width: 250, height: 250 }
			},
			onScanSuccess,
			onScanFailure
		);
		scanning = true;
	}

	async function stop() {
		await html5Qrcode.stop();
		scanning = false;
	}

	function onScanSuccess(decodedText, decodedResult) {
		decodedTextQr = decodedText;
		alert(`Code matched = ${decodedText}`);
		console.log(decodedResult);
	}

	function onScanFailure(error) {
		console.warn(`Code scan error = ${error}`);
	}
</script>

<div class="QrScanner">
	<reader id="reader" />
	{#if scanning}
		<button on:click={stop}>stop</button>
	{/if}
</div>

<style lang="scss">
	.QrScanner {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		// height: fit-content;
		// height: 100%;
		// overflow: hidden;
		gap: 20px;

		reader {
			width: 100%;
			// height: 500px;
			background-color: black;
		}
	}
</style>
