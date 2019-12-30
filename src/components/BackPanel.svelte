<script>
	import { navigate } from '../router/navigate';
	import Header from './Header.svelte';
	import IconButton from './IconButton.svelte';
</script>

<Header id='BackPanel'>
	<IconButton on:click={() => navigate('/')}>keyboard_arrow_left</IconButton>
	<slot></slot>
</Header>
