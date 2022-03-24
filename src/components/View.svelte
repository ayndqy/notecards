<script lang="ts">
  export let zIndex: string = '1'
  export let element: HTMLElement | null = null
</script>

<div class="view" style="z-index: {zIndex};" bind:this={element}>
  <slot />
</div>

<style>
  .view {
    position: fixed;
    width: 100%;
    height: 100%;
    height: -webkit-fill-available;
    overflow-x: hidden;
    overflow-y: scroll;
  }
</style>
