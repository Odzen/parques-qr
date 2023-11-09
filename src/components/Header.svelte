<script>
	import { page } from '$app/stores';
	import { Roles } from '$lib/enums';

	import CloseIcon from './icons/CloseIcon.svelte';
	import HamburgerMenu from './icons/HamburgerMenu.svelte';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	$: userRole = $page.data.user?.role;

	const links = [
		{
			text: 'Compañias',
			path: '/dashboard/companies',
			isForSuper: true
		},
		{
			text: 'Usuarios',
			path: '/dashboard/users',
			isForSuper: true
		},
		{
			text: 'Carnets',
			path: '/dashboard/carnets',
			isForSuper: false
		}
	];

	let linksToShow = links;

	$: if (userRole) {
		if (userRole === Roles.admin) {
			linksToShow = links.filter((link) => link.isForSuper === false);
		}
	}

	let displayContent = false;

	const toggleDisplayContent = () => {
		displayContent = !displayContent;
	};
</script>

<header class="Header">
	{#if $page.data.user}
		{#if userRole === Roles.admin}
			<h1>Administrador</h1>
		{:else}
			<h1>Super Administrador</h1>
		{/if}
		<nav class:displayContent>
			<ul>
				{#each linksToShow as linkToShow}
					<li aria-current={$page.url.pathname === linkToShow.path ? 'page' : undefined}>
						<a href={linkToShow.path} on:click={() => (displayContent = false)}>{linkToShow.text}</a
						>
					</li>
				{/each}

				<form
					action="/logout"
					method="POST"
					class="Header-logout-mobile"
					use:enhance={() => {
						return async ({ result }) => {
							invalidateAll();
							await applyAction(result);
						};
					}}
				>
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

		<form
			action="/logout"
			method="POST"
			class="Header-logout-desktop"
			use:enhance={() => {
				return async ({ result }) => {
					invalidateAll();
					await applyAction(result);
				};
			}}
		>
			<button type="submit">Cerrar sesión</button>
		</form>
	{/if}
</header>

<style lang="scss">
	.Header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: var(--white);
		padding: 20px;
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

		h1 {
			color: var(--black);
			font-size: 20px;
			font-weight: 700;
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

			ul {
				position: relative;
				padding: 0;
				margin: 0;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				gap: 20px;
				margin-top: 20px;
				list-style: none;
				background: var(--background);
				background-size: contain;

				li {
					position: relative;
					height: 100%;

					a {
						display: flex;
						height: 100%;
						align-items: center;
						padding: 0;
						color: var(--black);
						font-weight: 700;
						font-size: 22px;
						text-decoration: none;
						transition: color 0.2s linear;

						:hover {
							color: var(--primary-3);
						}
					}
				}
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

				ul {
					display: flex;
					flex-direction: row;
					justify-content: center;
					align-items: center;
					gap: 20px;
					list-style: none;
					background: var(--background);
					background-size: contain;

					li {
						position: relative;
						height: 100%;

						a {
							display: flex;
							height: 100%;
							align-items: center;
							padding: 0;
							color: var(--black);
							font-weight: 700;
							font-size: 16px;
							text-decoration: none;
							transition: color 0.2s linear;
						}

						:hover {
							color: var(--primary-3);
						}
					}

					li[aria-current='page'] {
						a {
							color: var(--primary-2);
						}

						border-bottom: 2px solid var(--primary-3);
					}
				}
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
