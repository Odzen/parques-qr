<script>
	import TextInput from '../../../components/inputs/TextInput.svelte';
	import MainButton from '../../../components/buttons/MainButton.svelte';
	import { validateEmailPattern } from '$lib/validators.js';
	import { authHandlers, authStore } from '../../../stores/authStore';

	let email = '';
	let errorPassword = '';

	$: emailValidation = validateEmailPattern(email);

	const resetPassword = async () => {
		try {
			const response = await authHandlers.resetPassword(email);
			console.log('response', response);
		} catch (err) {
			console.log('error resetting password', err);

			if (err?.code === 'auth/user-not-found') {
				errorPassword = 'El usuario no existe';
			} else {
				errorPassword = 'Ocurrió un error';
			}
		}
	};

	$: if ($authStore.currentUser) {
		window.location.href = '/dashboard';
	}
</script>

<div class="resetPassword">
	<h1>Ingresar correo</h1>
	<form id="reset-password-form" on:submit={async () => await resetPassword()}>
		<TextInput
			id="email"
			type="email"
			bind:value={email}
			invalid={email && !emailValidation.isValid}
			label="Email"
			placeholder="test@example.com"
			required
		/>

		{#if errorPassword}
			<p class="error">{errorPassword}</p>
		{/if}

		<a href="/login">Ingresar</a>

		<MainButton
			text="Restablecer contraseña"
			type="submit"
			form="reset-password-form"
			disabled={!emailValidation.isValid}
		/>
	</form>
</div>

<style lang="scss">
	.resetPassword {
		display: flex;
		padding-inline: 20px;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 20px;
		margin: auto 0;

		h1 {
			font-weight: 700;
			font-size: 24px;
		}

		a {
			text-decoration: none;
			font-size: 15px;
			color: var(--primary-2);
		}

		form {
			display: flex;
			flex-direction: column;

			gap: 20px;
			width: 100%;
			max-width: 500px;
			margin: 0 auto;

			p {
				margin: 0;
			}
		}
	}
</style>
