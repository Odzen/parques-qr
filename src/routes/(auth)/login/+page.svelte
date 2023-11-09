<script>
	import TextInput from '../../../components/inputs/TextInput.svelte';
	import MainButton from '../../../components/buttons/MainButton.svelte';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { validateEmailPattern } from '$lib/validators.js';

	export let form;

	let email = '';
	$: emailValidation = validateEmailPattern(email);
</script>

<div class="login">
	<form
		action="?/login"
		method="POST"
		id="login-form"
		use:enhance={() => {
			return async ({ result }) => {
				invalidateAll();
				await applyAction(result);
			};
		}}
	>
		<h1>Ingreso</h1>

		<TextInput
			id="email"
			type="text"
			bind:value={email}
			invalid={email && !emailValidation.isValid}
			label="Email"
			placeholder="test@example.com"
			required
		/>

		<TextInput id="password" type="password" label="Contraseña" placeholder="****" required />

		{#if form?.credentials}
			<p class="error">Las credenciales son incorrectas</p>
		{/if}

		{#if form?.user}
			<p class="error">Hubo un error al ingresar</p>
		{/if}

		<MainButton text="Ingresar" type="submit" form="login-form" />
	</form>
</div>

<style lang="scss">
	.login {
		display: flex;
		padding-inline: 20px;
		justify-content: center;
		margin: auto 0;

		form {
			display: flex;
			flex-direction: column;
			align-items: center;

			gap: 20px;
			width: 100%;
			max-width: 500px;
			margin: 0 auto;

			h1 {
				font-weight: 700;
				font-size: 24px;
			}

			p {
				margin: 0;
			}
		}
	}
</style>
