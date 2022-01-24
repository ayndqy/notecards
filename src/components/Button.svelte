<script lang="ts">
  import Icon from './Icon.svelte'

  export let icon: string | null = null
  export let title: string | null = null
  export let disabled: boolean = false

  let isIconExists = Boolean(icon)
  let isTextExists = Boolean($$slots.default)
</script>

<button
  {title}
  {disabled}
  class={$$props.class || ''}
  style={$$props.style || ''}
  class:icon={isIconExists}
  class:text={isTextExists}
  on:click
>
  {#if isIconExists}
    <Icon>{icon}</Icon>
  {/if}

  <slot />
</button>

<style>
  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    vertical-align: middle;
    padding: var(--padding) calc(var(--padding) * 1.5);

    border: 1px solid transparent;
    border-radius: 100rem;
    outline: none;

    font: inherit;
    font-weight: bold;
    letter-spacing: inherit;
    word-spacing: inherit;

    cursor: pointer;
    transition: color var(--transition-time), transform var(--transition-time),
      background var(--transition-time), border-color var(--transition-time);
  }
  button:active {
    transform: scale(0.925);
    transition: color calc(var(--transition-time) / 5), transform calc(var(--transition-time) / 5),
      background calc(var(--transition-time) / 5), border-color calc(var(--transition-time) / 5);
  }

  button.icon {
    padding: var(--padding);
  }

  button.icon.text {
    padding: var(--padding) calc(var(--padding) * 1.5);
  }

  /* Space between icon and text */
  /* Normal */
  button.icon.text :global(i.icon) {
    margin-left: -2px;
    margin-right: 0.5rem;
  }
  /* Reversed */
  button.reversed {
    flex-direction: row-reverse;
  }
  button.reversed.icon.text :global(i.icon) {
    margin-left: 0.5rem;
    margin-right: -2px;
  }

  /* Button padding size */
  button {
    --padding: 0.625rem;
  }
  button.small {
    --padding: 0.375rem;
  }
  button.big {
    --padding: 0.875rem;
  }

  /* Without edges */
  button.without-left-edge,
  button.icon.text.without-left-edge {
    margin-left: calc(0rem - var(--padding) * 1.5);
  }
  button.without-right-edge,
  button.icon.text.without-right-edge {
    margin-right: calc(0rem - var(--padding) * 1.5);
  }
  button.icon.without-left-edge {
    margin-left: calc(0rem - var(--padding));
  }
  button.icon.without-right-edge {
    margin-right: calc(0rem - var(--padding));
  }

  /* Default */
  button {
    color: var(--color);
    background: var(--surface);
    border-color: transparent;
  }
  button:hover,
  button:focus {
    color: var(--color);
    background: var(--surface);
    border-color: var(--border-color);
  }

  /* Disabled */
  button[disabled] {
    color: var(--color-secondary);
    opacity: 0.75;
    cursor: default;
  }
  button[disabled]:active {
    transform: scale(1);
    cursor: default;
  }

  /* Outlined */
  button.outlined {
    color: var(--color);
    background: var(--background);
    border-color: var(--border-color);
  }
  button.outlined:hover,
  button.outlined:focus {
    color: var(--color);
    background: var(--surface);
    border-color: var(--border-color);
  }

  /* Transparent */
  button.transparent {
    color: var(--color);
    background: transparent;
    border-color: transparent;
  }
  button.transparent:hover,
  button.transparent:focus {
    color: var(--color);
    background: var(--surface);
    border-color: transparent;
  }
</style>
