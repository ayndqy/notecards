<script>
   import { onMount } from 'svelte'
   import { cards, searchText } from '../stores';
   import View from '../components/View.svelte';
   import BackPanel from '../components/BackPanel.svelte';
   import CardList from '../components/CardList.svelte';

   let input;

   $searchText = '';

   onMount(() => input.focus());

   $: data = $cards.filter(card => {
      if (card.content.toLowerCase().search($searchText.toLowerCase()) !== -1) 
         return true;
      return false;
   });
</script>

<BackPanel>
   <input 
     class='search'
     type='text'
     placeholder='Start your search here'
     bind:this={input}
     bind:value={$searchText} />
</BackPanel>

<View id='CardListSearch' paddingTop="90px">
   <CardList
     data={data}
     swipeable={false}>
      <p>Can't find anything</p>
   </CardList>
</View>

<style>
   input.search{
      width: 100%;
      background: transparent;
      padding: var(--padding-s);
      border: none;
      line-height: 1.5rem;
      transition: border var(--transition);
      -webkit-touch-callout: default;
		-webkit-user-select: text;
			-moz-user-select: text;
			 -ms-user-select: text;
				  user-select: text;
   }
</style>