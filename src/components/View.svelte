<script>
   export let id,
              paddingTop = '0px',
              background = 'transparent',
              zIndex = 1,
              flyIn = 16,
              flyOut = -8;
   
   import { fly } from 'svelte/transition';
   import { expoOut } from 'svelte/easing';
   
   // Full window height
	let fullHeight = (window.innerHeight) + 'px';
	window.onresize = () => {
		fullHeight = (window.innerHeight) + 'px';
	}
</script>

<style>
   view-containder.view{
      display: block;
      width: 100vw;
      height: auto;
      position: fixed;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      padding: 0 calc(50vw - 300px);
      overflow-y: overlay;
      overflow-x: hidden;
   }

   @media only screen and (max-width: 700px) {
      view-containder.view{
         padding: 0 4.5vw;
      }
   }
</style>

<view-containder
  id={id}
  class='view'
  style='height: {fullHeight}; z-index: {zIndex}; background: {background}; padding-top: {paddingTop};'
  in:fly='{{ y: flyIn, delay: 35, duration: 300, easing: expoOut }}'
  out:fly='{{ y: flyOut, duration: 100 }}'>
   <slot></slot>
</view-containder>
