<script>
	export let text = '';
	export let type = 'submit';
	export let disabled = false;
	export let bgColor = 'var(--primary-1)';
	export let textColor = 'var(--white)';
	export let form = '';
	export let padding = '14px 20px';
</script>

<button
	class="MainButton"
	style="background-color: {bgColor};color: {textColor}; padding: {padding};"
	{type}
	{disabled}
	{form}
	on:click
>
	{#if text}
		<slot>{text}</slot>
	{/if}
	<slot name="icon" />
</button>

<style lang="scss">
	.MainButton {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		column-gap: 9.33px;
		border: unset;
		border-radius: 8px;
		font-size: inherit;
		font-weight: 700;
		line-height: inherit;
		letter-spacing: 0.2px;
		text-align: center;
		cursor: pointer;
		user-select: none;
		border: 1px solid var(--black);

		&:hover {
			background-color: var(--primary-3) !important;
		}

		&:disabled {
			color: var(--neutral-50) !important;
			background-color: var(--neutral-20) !important;
			cursor: not-allowed;
		}
	}
</style>
