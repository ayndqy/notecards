<script>
   export let card,
              editable = true,
              swipeable = true;

   import { onMount } from 'svelte';
   import { cards, contextMenu } from '../stores';
   import { navigate } from '../router/navigate';
   import { moveElement, deleteElement } from '../utils/array';
   import { swipe } from '../utils/swipe'

   let cardElement;

   // On change save to localStorage
   $: localStorage.setItem('cards', JSON.stringify($cards));

   // Handlers
   let clickHandler = () => {
      editable === true ? navigate('/editor?id=' + card.id) : null;
   }
   let contextMenuHandler = (event) => {
      event.preventDefault();
      $contextMenu = {
         isOpen: true, 
         card: card, 
         pos: {x: event.pageX, y: event.pageY}, 
         toggleState: () => cardOut(toggleState), 
         deleteCard: () => cardOut(deleteCard)
      }
   }
   
   // Swipes
   swipeable ? onMount(() => swipe(cardElement, toggleState)) : null;

   // Actions
   let toggleState = () => {
      if(card.content !== '') {
         card.state === 'active' ? card.state = 'archived' : card.state = 'active';
         $cards = moveElement($cards, $cards.indexOf(card), 0);
      } else {
         deleteCard();
      }
   }
   let deleteCard = () => {
      $cards = deleteElement($cards, $cards.indexOf(card));
   }

   // Visual transition for delete/toggleState
   let cardOut = (action) => {
      cardElement.style.setProperty('transition',
         'transform var(--transition), opacity var(--transition), margin-bottom var(--transition)');
      cardElement.style.setProperty('transform', 'translateX(450px)');
      cardElement.style.setProperty('opacity', '0');
      cardElement.style.setProperty('margin-bottom', (cardElement.offsetHeight * -1) + 'px');
      setTimeout(() => {
         action()
      }, 300);
   }
</script>

<card-item 
  id={card.id}
  class='block'
  on:click={clickHandler} 
  on:contextmenu={(event) => contextMenuHandler(event)}
  bind:this={cardElement}>
   {card.content}
</card-item>

<style>
   card-item {
      margin-bottom: var(--padding);
		background: var(--surface);
		line-height: var(--line-height);
      overflow: hidden;
      cursor: pointer;
      white-space: pre-wrap;
      word-wrap: break-word;
      border-radius: .9rem;
   }

   card-item:empty:before {
      content: 'Empty card';
      color: var(--color-secondary);
   }
</style>
