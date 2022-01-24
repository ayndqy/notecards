<script lang="ts">
  import { focus } from 'focus-svelte'
  import { fly } from 'svelte/transition'
  import BezierEasing from 'bezier-easing'
  import transitionTime from '../helpers/transitionTime'
</script>

<div
  class="modal-transition"
  use:focus={{ enabled: true, preventScroll: true }}
  in:fly={{
    y: window.innerHeight,
    delay: transitionTime / 4,
    duration: transitionTime * 0.75,
    easing: BezierEasing(0.5, 0.9, 0, 1),
    opacity: 1,
  }}
  out:fly={{
    y: window.innerHeight / 2,
    duration: transitionTime / 2,
    easing: BezierEasing(1, 0, 0.7, 0.15),
  }}
>
  <slot />
</div>

<style>
  .modal-transition {
    position: fixed;
    width: 100%;
    height: 100%;
    height: -webkit-fill-available;
    overflow: hidden;

    z-index: 1000;
    background: var(--background);
  }
</style>
