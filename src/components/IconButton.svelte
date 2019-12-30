<script>
	import Icon from './Icon.svelte';
</script>

<icon-button on:click>
	<Icon><slot></slot></Icon>
</icon-button>

<style>
	icon-button {
		display: inline-block;
		padding: calc(var(--padding-s) * 1.5);
		margin: calc(-.5 * var(--padding-s));
		cursor: pointer;
		transition: background var(--transition), transform var(--transition);
		transition-timing-function: cubic-bezier(.15,1,.5,1);
		border-radius: 3rem;
		z-index: 10;
		line-height: 0;
	}

	icon-button:active {
		background: var(--hover);
		transform: scale(0.925);
	}
</style>
