<script>
   export let  path = '/',
               title = document.title;

   import { pathname, pathparams } from './pathname';

   window.addEventListener('popstate', () => {
      $pathname = location.pathname;
      $pathparams = new URL(window.location).searchParams;
      
      if(path === $pathname) {
         document.title = title;
      }
	});
</script>

{#if path === $pathname}
   <slot></slot>
{/if}
