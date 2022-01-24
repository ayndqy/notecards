<script lang="ts">
  import type { Card } from '../cards'
  import { slide } from 'svelte/transition'
  import transitionTime from '../helpers/transitionTime'

  export let card: Card
  export let active: boolean = false
</script>

<a
  class="card-element"
  href={'/?id=' + card.id + '#card'}
  class:active
  in:slide|local={{ delay: transitionTime, duration: 0 }}
>
  <!-- Card content -->
  <div class="card-content">
    {card.content}
  </div>
</a>

<style>
  .card-element {
    display: block;
    margin-bottom: 1rem;
    padding: 1.5rem;

    background: var(--surface);
    color: var(--color);
    border-radius: 0.75rem;

    text-decoration: none;

    transition: opacity calc(var(--transition-time) / 2), transform calc(var(--transition-time) / 2);
    transition-delay: calc(var(--transition-time));
  }
  .card-element:active,
  .card-element.active,
  .card-element:focus {
    opacity: 0.75;
    transform: scale(0.975);
    transition: opacity calc(var(--transition-time) / 2), transform calc(var(--transition-time) / 2);
  }

  .card-element.active {
    opacity: 0;
    transform: scale(0.925);
  }

  .card-content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
    white-space: pre-line;
    overflow: hidden;
  }
  .card-content:empty:before {
    content: 'Empty card...';
    color: var(--color-secondary);
  }
</style>
