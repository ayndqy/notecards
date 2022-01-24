<script lang="ts">
  import { Route, hash } from 'svelte-micro'
  import { cards } from './cards'
  import ModalTransition from './components/ModalTransition.svelte'
  import Home from './pages/Home.svelte'
  import Editor from './pages/Editor.svelte'

  // Remove empty cards
  $: if ($hash !== '#card') $cards.forEach((card) => card.content === '' && cards.delete(card.id))
</script>

<Route>
  {#if $hash === '#card'}
    <ModalTransition>
      <Editor />
    </ModalTransition>
  {/if}

  <Route path="/">
    <Home />
  </Route>

  <Route path="/settings">TODO</Route>
  <Route path="/archive">TODO</Route>
</Route>
