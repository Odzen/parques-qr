<script>
	import CloseIcon from './icons/CloseIcon.svelte';
	import HamburgerMenu from './icons/HamburgerMenu.svelte';
	import { authHandlers } from '../stores/authStore';

	let displayContent = false;

	const toggleDisplayContent = () => {
		displayContent = !displayContent;
	};

	const logout = async () => {
		await authHandlers.logout();
	};
</script>

<header class="Header">
	<h2>PasaPass</h2>
	<nav class:displayContent>
		<ul>
			<form class="Header-logout-mobile" on:submit|preventDefault={logout}>
				<button type="submit">Cerrar sesión</button>
			</form>
		</ul>
	</nav>

	{#if displayContent}
		<button class="Header-icon--close" on:click={toggleDisplayContent} type="button">
			<CloseIcon width="100%" height="100%" color="inherit" />
		</button>
	{:else}
		<button class="Header-icon" on:click={toggleDisplayContent} type="button">
			<HamburgerMenu width="100%" height="100%" color="inherit" />
		</button>
	{/if}

	<form class="Header-logout-desktop" on:submit|preventDefault={logout}>
		<button type="submit">Cerrar sesión</button>
	</form>
</header>

<style lang="scss">
	.Header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--white);
		padding: 20px;
		h2 {
			font-size: 24px;
			font-weight: 700;
			color: var(--black);
		}

		button {
			background-color: transparent;
			border: none;
			cursor: pointer;
		}

		&-icon {
			width: 23.5px;
			height: 23.5px;
			display: flex;
			fill: var(--black);
			color: var(--black);

			&--close {
				width: 26.5px;
				height: 26.5px;
				display: flex;
				position: relative;
				z-index: 55;
				fill: var(--primary-130);
				color: var(--primary-130);
				cursor: pointer;
			}
		}

		nav {
			display: none;
			flex-direction: column;
			justify-content: space-between;
			position: fixed;
			height: auto;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: 50;
			padding-inline: 8.21vw;
			padding-block: min(13.76vw, 80px) min(16.9vw, 70px);
			background: linear-gradient(179.45deg, var(--white) 22.77%, var(--primary-3) 99.52%);

			&.displayContent {
				display: flex;
			}
		}

		&-logout {
			&-desktop {
				display: none;
				button {
					font-size: 16px;
				}

				:hover {
					color: var(--primary-2);
				}
			}
			&-mobile {
				display: flex;
				button {
					color: var(--black);
					font-weight: 700;
					font-size: 22px;
				}
			}
		}
	}

	@media screen and (min-width: $breakpoint-tablet) {
		.Header {
			&-icon,
			&-icon--close {
				display: none;
			}

			nav {
				display: flex;
				position: relative;
				padding: 0;
				background: none;
			}
			&-logout {
				&-desktop {
					display: flex;
				}
				&-mobile {
					display: none;
				}
			}
		}
	}
</style>
