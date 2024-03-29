<script lang="ts">
  import { fade } from 'svelte/transition'
  import { router, query, hash } from 'svelte-micro'
  import { transitionTime } from '../helpers/transitionTime'
  import { cards } from '../cards'

  import Icon from '../components/Icon.svelte'
  import Button from '../components/Button.svelte'
  import View from '../components/View.svelte'
  import Header from '../components/Header.svelte'
  import CardElement from '../components/CardElement.svelte'
  import Logo from '../components/Logo.svelte'

  let viewElement: HTMLElement

  $: filteredCards = [...$cards].filter((card) => card.state === 'active')
  $: activeId = Number(new URLSearchParams($query).get('id'))

  const createAndOpenCard = (): void => {
    let id = cards.create('text')
    router.push('/?id=' + id + '#card')
  }

  const scrollToTop = (): void => {
    if ($hash === '#card') viewElement?.scrollTo({ top: 0 })
  }

  // Scroll to top on $cards change
  $: ((_) => scrollToTop())($cards)
</script>

<View bind:element={viewElement}>
  <!-- Header -->
  <Header>
    <svelte:fragment slot="left">
      <Logo count={$cards.length} />
    </svelte:fragment>
    <svelte:fragment slot="right">
      <Button class="transparent" icon="add" on:click={createAndOpenCard} />
      <Button class="transparent without-right-edge" icon="expand_more" />
    </svelte:fragment>
  </Header>

  <!-- Menu -->

  <!-- Card List -->
  <main class="card-list container extended">
    {#each filteredCards as card (card.id)}
      <CardElement {card} active={activeId === card.id} />
    {:else}
      <p class="placeholder" transition:fade={{ duration: transitionTime / 2 }}>
        Tap <Icon>add</Icon> to add new card
      </p>
    {/each}
  </main>
</View>

<style>
  .placeholder {
    width: 100%;
    height: calc(100vh - 160px);
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: var(--color-secondary);
  }
  .placeholder :global(.icon) {
    margin: 0 0.25rem;
  }
</style>
