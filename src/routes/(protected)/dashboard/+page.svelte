<script>
	import { authStore } from '../../../stores/authStore';
	import LoadingSpinner from '../../../components/icons/LoadingSpinner.svelte';
	import MainButton from '../../../components/buttons/MainButton.svelte';
	import QrScanner from '../../../components/QrScanner.svelte';
	import PassportsService from '../../../services/passports/PassportsService';
	import { splitCodePassport } from '../../../lib/utils.js';

	let decodedTextQr = '';
	let scanning = false;

	let isForPassportInformation = false;
	let isForValidatePassport = false;
	let isForCancelTransaction = false;

	let responseCallingAPI = '';
	let lastAction = -1;

	const actions = [
		{
			text: 'Ver información de QR',
			action: () => {
				responseCallingAPI = '';
				scanning = true;
				isForPassportInformation = true;
				isForValidatePassport = false;
				isForCancelTransaction = false;
				decodedTextQr = '';
			}
		},
		{
			text: 'Autorizar QR',
			action: () => {
				scanning = true;
				responseCallingAPI = '';
				isForPassportInformation = false;
				isForValidatePassport = true;
				isForCancelTransaction = false;
				decodedTextQr = '';
			}
		}
		// {
		// 	text: 'Anular autorización',
		// 	action: () => {
		// 		scanning = true;
		// 		responseCallingAPI = '';
		// 		isForPassportInformation = false;
		// 		isForValidatePassport = false;
		// 		isForCancelTransaction = true;
		// 		decodedTextQr = '';
		// 	}
		// }
	];

	let isLoading = false;
	$: if (decodedTextQr) {
		scanning = false;

		const { code, pass } = splitCodePassport(decodedTextQr);

		if (isForPassportInformation) {
			lastAction = 0;
			passportInformation(code, pass)
				.then((response) => {
					responseCallingAPI = response?.resp;
				})
				.catch((err) => {
					console.log('error passport information', err);
					responseCallingAPI = err?.message;
				});
		} else if (isForValidatePassport) {
			lastAction = 1;
			validatePassport(code, pass)
				.then((response) => {
					responseCallingAPI = response?.resp;
				})
				.catch((err) => {
					console.log('error validate passport', err);
					responseCallingAPI = err?.message;
				});
		} else if (isForCancelTransaction) {
			lastAction = 2;
			cancelTransaction(code, pass)
				.then((response) => {
					responseCallingAPI = response?.resp;
				})
				.catch((err) => {
					console.log('error cancel transaction', err);
					responseCallingAPI = err?.message;
				});
		}
	}

	const passportsService = new PassportsService();

	const passportInformation = async (code, pass) => {
		try {
			isLoading = true;

			let response = await passportsService.infoPassport({
				code,
				pass
			});

			isLoading = false;
			return response;
		} catch (err) {
			isLoading = false;
			throw err;
		}
	};

	const validatePassport = async (code, pass) => {
		try {
			isLoading = true;

			const response = await passportsService.validatePassport({
				code,
				pass,
				email: $authStore.currentUser.email
			});

			isLoading = false;

			return response;
		} catch (err) {
			isLoading = false;
			throw err;
		}
	};

	const cancelTransaction = async (code, pass) => {
		try {
			isLoading = true;

			const response = await passportsService.cancelTransaction({
				code,
				pass,
				email: $authStore.currentUser.email
			});

			isLoading = false;

			return response;
		} catch (err) {
			isLoading = false;
			throw err;
		}
	};
</script>

<div class="dashboard">
	{#if $authStore.currentUser}
		{#if isLoading}
			Cargando...
		{:else if responseCallingAPI}
			<div class="dashboard-response">
				<p>{responseCallingAPI}</p>

				<div class="dashboard-response-ctas">
					<a href="/dashboard">Regresar</a>
					<button on:click={actions[lastAction].action} type="button">Escanear otro código</button>
				</div>
			</div>
		{:else if scanning}
			<div class="dashboard-scanner">
				<QrScanner bind:decodedTextQr bind:scanning />
			</div>
		{:else}
			<div class="dashboard-actions">
				{#each actions as action}
					<MainButton text={action.text} on:click={action.action} type="button" />
				{/each}
			</div>
		{/if}
	{:else}
		<LoadingSpinner width="50" height="50" />
	{/if}
</div>

<style lang="scss">
	.dashboard {
		display: flex;
		padding-inline: 20px;
		justify-content: center;
		margin: auto 0;

		&-response {
			display: flex;
			flex-direction: column;
			gap: 10px;
			padding: 20px;
			max-width: 600px;

			p {
				font-size: 16px;
			}

			a {
				text-decoration: none;
				font-size: 15px;
				color: var(--primary-2);
			}

			button {
				margin: 0;
				padding: 0;
				font-size: 15px;
				color: var(--primary-2);
				background: none;
				border: none;
				cursor: pointer;
				width: fit-content;
			}

			&-ctas {
				display: flex;
				gap: 25px;
			}
		}

		&-actions {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		&-scanner {
			display: flex;
			width: 100%;
			height: fit-content;
		}
	}
</style>
