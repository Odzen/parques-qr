<script>
	import './styles.scss';
	import { browser } from '$app/environment';
	import { navigating } from '$app/stores';
	import LoadingSpinner from '../components/icons/LoadingSpinner.svelte';
	import Header from '../components/Header.svelte';
	import { onMount } from 'svelte';
	import { firebaseAuth } from '../lib/firebase/firebase.client';
	import { authStore } from '../stores/authStore.js';

	onMount(() => {
		const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
			authStore.update((curr) => {
				return {
					...curr,
					isLoading: false,
					currentUser: user
				};
			});

			if (
				browser &&
				!$authStore?.currentUser &&
				!$authStore?.isLoading &&
				window.location.pathname !== '/login'
			) {
				window.location.href = '/';
			}
		});

		return unsubscribe;
	});
</script>

<div class="app">
	<div class="app-header">
		{#if $authStore.currentUser}
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
		<p>PasaPass</p>
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
