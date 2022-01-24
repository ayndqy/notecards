<script lang="ts">
  export let zIndex: string = '1'
</script>

<div class="view" style="z-index: {zIndex};">
  <slot />
</div>

<style>
  .view {
    position: fixed;
    width: 100%;
    height: 100%;
    height: -webkit-fill-available;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
