<script>
	export let 	id,
					zIndex = 100;
	
	import { fly } from 'svelte/transition';
	import { expoOut } from 'svelte/easing';
</script>

<header
  id={id}
  style='z-index: {zIndex}'
  in:fly='{{ y: -16, duration: 300, delay: 35, easing: expoOut }}'
  out:fly='{{ y: -8, duration: 100 }}'>
	<slot></slot>
</header>

<style>
	header {
		display: flex;
      width: 100%;
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      padding: var(--padding) calc(50vw - 300px + var(--padding) - var(--padding-s));
		justify-content: space-between;
		align-items: center;
      background: var(--gradient);
	}

	@media only screen and (max-width: 700px) {
      header {
         padding: var(--padding) calc(4.5vw + var(--padding) - var(--padding-s));
      }
	}
</style>
