<script>
	import { onMount } from 'svelte';
	import { cards, contextMenu } from './stores';
	import { pathparams } from './router/pathname';
	import { navigate } from './router/navigate';
	import Route from './router/Route.svelte';
	import Home from './pages/Home.svelte';
	import Editor from './pages/Editor.svelte';
	import Search from './pages/Search.svelte';
	import Archive from './pages/Archive.svelte';
	import Settings from './pages/Settings.svelte';
	import ContextMenu from './components/ContextMenu.svelte';

	// Share target action and initial redirect
	const parsedUrl = new URL(window.location);
	if(parsedUrl.searchParams.get('text') !== null){
		window.addEventListener('DOMContentLoaded', () => {
			$cards = [{id: Date.now(), type: 'text', content: parsedUrl.searchParams.get('text'), state: 'active'}, ...$cards];
			navigate('/editor?id=' + $cards[0].id);
		});
	} else {
		onMount(() => navigate('/'));
	}
</script>

<!-- Routes -->
<Route path='/'>
	<Home />
</Route>
<Route path='/editor'>
	<Editor />
</Route>
<Route path='/search'>
	<Search />
</Route>
<Route path='/archive'>
	<Archive />
</Route>
<Route path='/settings'>
	<Settings />
</Route>

{#if $contextMenu.isOpen === true}
	<ContextMenu />
{/if}