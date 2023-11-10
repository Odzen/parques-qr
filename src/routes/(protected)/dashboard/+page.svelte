<script>
	import { authStore } from '../../../stores/authStore';
	import LoadingSpinner from '../../../components/icons/LoadingSpinner.svelte';
	import MainButton from '../../../components/buttons/MainButton.svelte';
	import QrScanner from '../../../components/QrScanner.svelte';

	let decodedTextQr = '';
	let scanning = false;

	let isForPassportInformation = false;
	let isForValidatePassport = false;
	let isForCancelTransaction = false;

	const actions = [
		{
			text: 'Ver información de QR',
			action: () => {
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
				isForPassportInformation = false;
				isForValidatePassport = true;
				isForCancelTransaction = false;
				decodedTextQr = '';
			}
		},
		{
			text: 'Anular autorización',
			action: () => {
				scanning = true;
				isForPassportInformation = false;
				isForValidatePassport = false;
				isForCancelTransaction = true;
				decodedTextQr = '';
			}
		}
	];

	$: if (decodedTextQr) {
		console.log('decodedTextQr', decodedTextQr);
		scanning = false;
		if (isForPassportInformation) {
			passportInformation()
				.then(() => {
					console.log('passport information');
				})
				.catch((err) => {
					console.log('error passport information', err);
				});
		} else if (isForValidatePassport) {
			validatePassport()
				.then(() => {
					console.log('validate passport');
				})
				.catch((err) => {
					console.log('error validate passport', err);
				});
		} else if (isForCancelTransaction) {
			cancelTransaction()
				.then(() => {
					console.log('cancel transaction');
				})
				.catch((err) => {
					console.log('error cancel transaction', err);
				});
		}
	}

	const passportInformation = async () => {
		console.log('Passport information');
	};

	const validatePassport = async () => {
		console.log('Validate Passport');
	};

	const cancelTransaction = async () => {
		console.log('Cancel transaction');
	};
</script>

<div class="dashboard">
	{#if $authStore.currentUser}
		{#if scanning}
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

		&-actions {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}

		&-scanner {
			display: flex;
			width: 100%;
			height: fit-content;
			// max-height: 500px;
		}
	}
</style>
