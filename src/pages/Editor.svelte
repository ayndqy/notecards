<script lang="ts">
  import { fade } from 'svelte/transition'
  import { query } from 'svelte-micro'
  import autosize from 'autosize'
  import transitionTime from '../helpers/transitionTime'
  import { Card, cards } from '../cards'

  import Button from '../components/Button.svelte'
  import View from '../components/View.svelte'
  import Header from '../components/Header.svelte'

  $: id = Number(new URLSearchParams($query).get('id'))
  $: index = cards.getIndex($cards, id)

  const deleteAndGoBack = (id: Card['id']) => {
    cards.delete(id)
    history.back()
  }

  const updateCardContent = (id: Card['id'], content: Card['content']) => {
    cards.update(id, (card) => {
      card.content = content
      return card
    })
  }
</script>

<!-- Esc exit -->
<svelte:window on:keydown={(event) => event.key === 'Escape' && history.back()} />

<View zIndex="1000">
  <!-- Header -->
  <Header>
    <svelte:fragment slot="left">
      <Button icon="navigate_before" class="transparent without-left-edge" on:click|once={() => history.back()} />
    </svelte:fragment>
    <svelte:fragment slot="right">
      <Button icon="delete" class="transparent without-right-edge" on:click|once={() => deleteAndGoBack(id)} />
    </svelte:fragment>
  </Header>

  <!-- Textarea -->
  <main class="editor container">
    {#if $cards[index] !== undefined}
      <textarea
        id="editorTextarea"
        placeholder="Start typing here..."
        value={$cards[index].content}
        on:input={(event) => updateCardContent(id, event.currentTarget.value)}
        use:autosize
        out:fade={{ delay: transitionTime, duration: 0 }}
      />
    {/if}
  </main>
</View>

<style>
  #editorTextarea {
    width: 100%;
    height: 100%;
    margin-bottom: 1.5rem;

    background: transparent;
    border: none;

    font-size: 1rem;
    font-family: inherit;
    letter-spacing: inherit;
    line-height: inherit;
    word-spacing: inherit;
    color: inherit;

    resize: none;
    overflow: hidden;
  }
</style>
