<script>
	import { authStore } from '../../../stores/authStore';
	import LoadingSpinner from '../../../components/icons/LoadingSpinner.svelte';
</script>

{#if $authStore.currentUser}
	Hey
{:else}
	<LoadingSpinner />
{/if}
