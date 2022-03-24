<script lang="ts">
  export let count: number = 2
</script>

<h5 class="logo" class:no-cards={count == 0} class:card={count == 1}>
  No<span class="te">te</span>card<span class="s">s</span>
</h5>

<style>
  .logo .te,
  .logo .s {
    opacity: 1;
    margin: 0;
    transition-property: opacity, margin;
    transition-duration: calc(var(--transition-time) / 2);
    transition-delay: var(--transition-time);
  }
  .logo.no-cards .te,
  .logo.card .s {
    opacity: 0;
    margin-left: -0.675rem;
  }
</style>
