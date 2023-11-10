<script>
	import TextInput from '../../../components/inputs/TextInput.svelte';
	import MainButton from '../../../components/buttons/MainButton.svelte';
	import { validateEmailPattern } from '$lib/validators.js';
	import { authHandlers, authStore } from '../../../stores/authStore';

	let email = '';
	let password = '';
	let errorLogin = '';

	$: emailValidation = validateEmailPattern(email);
	$: passwordValidation = password.length > 5;

	const login = async () => {
		try {
			await authHandlers.login(email, password);
		} catch (err) {
			console.log('error', err);

			if (err?.code === 'auth/user-not-found') {
				errorLogin = 'El usuario no existe';
			} else if (err?.code === 'auth/wrong-password') {
				errorLogin = 'La contraseña es incorrecta';
			} else {
				errorLogin = 'Ocurrió un error';
			}
		}
	};

	$: if ($authStore.currentUser) {
		window.location.href = '/dashboard';
	}
</script>

<div class="login">
	<figure>
		<img src="/images/pasapass.jpg" alt="logo" />
	</figure>

	<h1>Ingreso</h1>
	<form id="login-form" on:submit={async () => await login()}>
		<TextInput
			id="email"
			type="email"
			bind:value={email}
			invalid={email && !emailValidation.isValid}
			label="Email"
			placeholder="test@example.com"
			required
		/>

		<TextInput
			id="password"
			bind:value={password}
			invalid={password && !passwordValidation}
			type="password"
			label="Contraseña"
			placeholder="******"
			required
		/>

		{#if errorLogin}
			<p class="error">{errorLogin}</p>
		{/if}

		<a href="/resetPassword">Olvidé contraseña</a>

		<MainButton
			text="Ingresar"
			type="submit"
			form="login-form"
			disabled={!emailValidation.isValid || !passwordValidation}
		/>
	</form>
</div>

<style lang="scss">
	.login {
		display: flex;
		padding-inline: 20px;
		justify-content: center;
		flex-direction: column;
		gap: 20px;
		align-items: center;
		margin: auto 0;

		figure {
			display: flex;
			border-radius: 20px;
			width: 150px;
			margin: 0;

			img {
				width: 100%;
				height: 100%;
				border-radius: inherit;
			}
		}

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
