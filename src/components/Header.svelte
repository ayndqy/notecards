<header>
  <div class="container">
    <div class="left">
      <slot name="left" />
    </div>

    <div class="center">
      <slot />
    </div>

    <div class="right">
      <slot name="right" />
    </div>
  </div>
</header>

<style>
  header {
    position: sticky;
    top: 0;
    padding: 0.75rem 0;
    z-index: 100;

    background: var(--fading);
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .left,
  .center,
  .right {
    display: flex;
    align-items: center;
    justify-content: left;
  }
</style>
