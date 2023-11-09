<script>
	import './styles.scss';
	import { page } from '$app/stores';
	import { navigating } from '$app/stores';
	import LoadingSpinner from '../components/icons/LoadingSpinner.svelte';
	import Header from '../components/Header.svelte';
</script>

<div class="app">
	<div class="app-header">
		{#if $page.data.user}
			<Header />
		{/if}
	</div>
	<main>
		{#if $navigating}
			<div class="app-loading">
				<LoadingSpinner width="50px" height="50px" />
			</div>
		{:else}
			<slot />
		{/if}
	</main>

	<footer>
		<p>Valid Id App</p>
	</footer>
</div>

<style lang="scss">
	.app {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		min-height: 100vh;

		&-loading {
			display: flex;
			align-items: center;
			justify-content: center;
			margin: auto;
		}
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
