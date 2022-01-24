<script lang="ts">
  export let size: string = '1.5rem'
</script>

<i
  class="icon {$$props.class || ''}"
  style="font-size: {size}; max-width: {size}; {$$props.style || ''}"
>
  <slot />
</i>

<style>
  @font-face {
    font-family: 'Material Icons Outlined';
    src: url(https://fonts.gstatic.com/s/materialiconsoutlined/v38/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUce.woff2)
      format('woff2');
    font-style: normal;
    font-weight: 400;
    font-display: block;
  }

  i {
    display: inline-block;
    vertical-align: -0.45rem;
    color: inherit;
    font-family: 'Material Icons Outlined';
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    text-transform: none;
    overflow: hidden;
    letter-spacing: 0;
    word-spacing: 0;
  }
</style>
