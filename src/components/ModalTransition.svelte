<script lang="ts">
  import { focus } from 'focus-svelte'
  import { fly } from 'svelte/transition'
  import BezierEasing from 'bezier-easing'
  import { transitionTime } from '../helpers/transitionTime'

  const inFly = {
    y: window.innerHeight,
    duration: transitionTime * 1,
    easing: BezierEasing(0.375, 0.95, 0, 1),
    opacity: 0,
  }

  const outFly = {
    y: window.innerHeight * 0.5,
    duration: transitionTime * 0.5,
    easing: BezierEasing(1, 0, 0.7, 0.15),
  }
</script>

<div class="modal-transition" use:focus={{ enabled: true, preventScroll: true }} in:fly={inFly} out:fly={outFly}>
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
