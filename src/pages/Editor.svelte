<script>
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
   import { expoOut } from 'svelte/easing';
	import { cards } from '../stores';
	import { moveElement } from '../utils/array';
	import { pathparams } from '../router/pathname';
   import BackPanel from '../components/BackPanel.svelte';
	
	let editor;

	// Search card
	let card = $cards[$cards.indexOf($cards.find(c => c.id === parseInt($pathparams.get('id'))))];

	// On change save to localStorage
   $: localStorage.setItem('cards', JSON.stringify($cards));

	// On open editor
	onMount(() => {
		editor.focus();
		$cards = moveElement($cards, $cards.indexOf(card), 0);
		card.state === 'active' ? null : card.state = 'active';
	});

	// Full window height style
	let fullHeightStyle = 'height:' + (window.innerHeight) + 'px';
	window.onresize = () => {
		fullHeightStyle = 'height:' + (window.innerHeight) + 'px';
	}
</script>

<BackPanel />
<textarea 
	class='editor'
	name='Editor'
	placeholder='Type here...'
	style={fullHeightStyle}
	in:fly='{{ y: 16, delay: 35, duration: 300, easing: expoOut }}'
	bind:value={card.content}
	bind:this={editor} />

<style>
	textarea{
		display: block;
      width: 100%;
      height: auto;
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      padding: 0 calc(50vw - 300px + var(--padding));
		padding-top: 90px;
		padding-bottom: var(--padding);
      overflow-y: overlay;
      overflow-x: hidden;
		border: none;
		background: var(--background);
		line-height: var(--line-height);
		resize: none;
		-webkit-touch-callout: default;
		-webkit-user-select: text;
			-moz-user-select: text;
			 -ms-user-select: text;
				  user-select: text;
	}

	@media only screen and (max-width: 700px) {
      textarea{
         padding: 0 calc(4.5vw + var(--padding));
			padding-top: 90px;
			padding-bottom: var(--padding);
      }
   }
</style>
