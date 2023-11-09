<script>
	import { authStore } from '../../../stores/authStore';
	import LoadingSpinner from '../../../components/icons/LoadingSpinner.svelte';
	import MainButton from '../../../components/buttons/MainButton.svelte';

	const actions = [
		{
			text: 'Ver información de QR',
			action: async () => await passportInformation()
		},
		{
			text: 'Autorizar QR',
			action: async () => await validatePassport()
		},
		{
			text: 'Anular autorización',
			action: async () => await cancelTransaction()
		}
	];

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
		<div class="dashboard-actions">
			{#each actions as action}
				<MainButton text={action.text} on:click={action.action} type="button" />
			{/each}
		</div>
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
	}
</style>
