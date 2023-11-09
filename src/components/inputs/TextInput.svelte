<script>
	import { onMount } from 'svelte';

	export let label = '';
	export let value = '';
	export let placeholder = '';
	export let type = 'text';
	export let invalid = false;
	export let disabled = false;
	export let highlightIfValid = true;
	export let attributes = {};
	export let readonly = false;
	export let isFocus = false;
	export let id = '';
	export let required = false;
	export let error = '';
	export let min = null;
	export let max = null;

	let input;

	onMount(() => {
		if (isFocus) input.focus();
	});

	$: if (value == 0) value = '';

	const handleInput = (e) => {
		value = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
	};
</script>

<div class="TextInput">
	<label for={id}
		>{label}
		{#if required}*{/if}</label
	>
	<input
		{value}
		name={id}
		{id}
		bind:this={input}
		{type}
		{placeholder}
		{disabled}
		{min}
		{max}
		class="TextInput-input"
		class:TextInput-input--invalid={invalid}
		class:TextInput-input--valid={value && !invalid && highlightIfValid}
		{...attributes}
		{readonly}
		{required}
		autocomplete="off"
		on:input={handleInput}
	/>
	{#if error}
		<p class="error">{error}</p>
	{/if}
</div>

<style lang="scss">
	.TextInput {
		width: 100%;
		display: flex;
		flex-direction: column;

		label {
			@include label-input;
		}

		&-input {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			display: flex;
			padding: 10px;
			padding-right: 32px;
			border: 1px solid var(--primary-2);
			border-radius: 4px;
			color: var(--black);
			font-size: 14px;
			letter-spacing: 0.2px;
			outline: unset;

			&:hover {
				border-color: var(--primary-3);
			}

			&:focus {
				border: 3px solid var(--primary-3);
			}

			&:disabled {
				background-color: transparent;
				color: var(--neutral-50);
				border-color: var(--neutral-50);
				cursor: not-allowed;
			}

			&::placeholder {
				color: var(--neutral-70);
			}

			&--valid {
				border-color: var(--success-base);

				&:hover {
					border-color: var(--success-hover);
				}
				&:focus {
					border-color: var(--success-focus);
				}
			}

			&--invalid {
				border-color: var(--error-base);

				&:hover {
					border-color: var(--error-hover);
				}
				&:focus {
					border-color: var(--error-focus);
				}
			}
		}
	}
</style>
