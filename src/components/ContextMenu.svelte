<script>
   import { onMount } from 'svelte';
   import { fade } from 'svelte/transition';
   import { contextMenu } from '../stores';
   import Icon from './Icon.svelte';

   $: x = ($contextMenu.pos.x + 200) > window.innerWidth ? $contextMenu.pos.x - 200 : $contextMenu.pos.x;
   $: y = ($contextMenu.pos.y + 200) > window.innerHeight ? $contextMenu.pos.y - 204 : $contextMenu.pos.y;

   onMount((event) => {
      window.addEventListener('click', event => {
         $contextMenu = {
            isOpen: false, 
            card: $contextMenu.card, 
            pos: {x: $contextMenu.pos.x, y: $contextMenu.pos.y}, 
            toggleState: () => $contextMenu.toggleState, 
            deleteCard: () => $contextMenu.deleteCard
         }
      });
   });

   let copyCard = () => {
      document.getElementById($contextMenu.card.id).style.userSelect = 'text';
      window.getSelection().selectAllChildren(
         document.getElementById($contextMenu.card.id)
      );
      document.execCommand('copy');
      setTimeout(() => document.getElementById($contextMenu.card.id).style.userSelect = null, 100);
   };
</script>

<menu
  class='card-menu'
  style='top: {y}px; left: {x}px;'
  in:fade='{{ duration: 100 }}'>
   <li class='list-item' on:click={copyCard}>
      <Icon fontSize='1.4rem'>notes</Icon> 
      Copy all
   </li>
   <li class='list-item' on:click={() => $contextMenu.toggleState()}>
      <Icon fontSize='1.4rem'>access_time</Icon>
      {$contextMenu.card.state === 'active' ? 'Archive' : 'Unarchive'}
   </li>
   <li class='list-item' on:click={() => $contextMenu.deleteCard()}>
      <Icon fontSize='1.4rem'>delete</Icon>
      Delete
   </li>
</menu>

<style>
   menu.card-menu{
      position: absolute;
      padding: .5rem 0;
      z-index: 10000;
      background: var(--background);
      min-width: 200px;
      border: 1px solid var(--contrast);
      border-radius: .4rem;
   }
   
   li.list-item{
      display: flex;
      align-items: center;
      line-height: 1;
      padding: var(--padding-s) calc(var(--padding-s) + .5rem);
      transition: background var(--transition);
      cursor: pointer;
      font-weight: bold;
   }

   li.list-item:hover{
      background: var(--hover);
   }

   :global(menu.card-menu > li.list-item > i){
      margin-right: calc(var(--padding-s) + .5rem);
   }
</style>
