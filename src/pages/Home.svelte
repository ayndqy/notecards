<script>
   import { cards } from '../stores';
   import { pathname, pathparams } from '../router/pathname';
   import { navigate } from '../router/navigate';
   import Header from '../components/Header.svelte';
   import View from '../components/View.svelte';
   import Icon from '../components/Icon.svelte';
   import IconButton from '../components/IconButton.svelte';
   import CardList from '../components/CardList.svelte';

   // Get cards only with active state
   $: data = $cards.filter(card => {if (card.state === 'active') return true; return false;});

   // Get menu state by url
   $: menuIsOpen = $pathparams ? $pathparams.get('menu') === 'open' : false;
   
   let addCard = () => {
		if($cards[0]){
			if($cards[0].content !== '') {
				$cards = [{id: Date.now(), type: 'text', content: '', state: 'active'}, ...$cards]
			} else if($cards[0].state === 'archived') {
				$cards = [{id: Date.now(), type: 'text', content: '', state: 'active'}, ...$cards];
			}
		} else {
			$cards = [{id: Date.now(), type: 'text', content: '', state: 'active'}, ...$cards];
		}
		navigate('/editor?id=' + $cards[0].id);
	}
</script>

<!-- Header -->
<Header id='MainHeader'>
   <h5 class='text-logo'>notecards</h5>
   <div class='header-icons'>
      <IconButton 
        on:click={() => menuIsOpen ? navigate('/search') : addCard()}>
         {menuIsOpen ? 'search' : 'add'}
      </IconButton>
      <IconButton 
        on:click={() => menuIsOpen ? navigate('/') : navigate('/?menu=open')}>
         {menuIsOpen ? 'expand_less' : 'expand_more'}
      </IconButton>
   </div>
</Header>

<!-- Navigation -->
{#if menuIsOpen}
   <View
     id='Navigation' 
     zIndex={10} 
     background='var(--gradient)' 
     flyIn={-32} flyOut={-16}>
      <nav>
         <li class='list-item' on:click={() => navigate('/archive')}>
            Archive <Icon>access_time</Icon>
         </li>

         <li class='list-item' on:click={() => navigate('/settings')}>
            Settings <Icon>settings</Icon>
         </li>
      </nav>
   </View>
{/if}

<!-- CardList -->
<View id='CardList' paddingTop='90px'>
   <CardList data={data}>
      <p>Tap <Icon>add</Icon> to add new card</p>
   </CardList>
</View>

<style>
   /* Logo */
   h5.text-logo{
		padding: var(--padding-s);
		font-size: 1.25rem;
		font-family: var(--font-family-headline);
   }
   
   /* Navigation */
   nav {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		width: 100%;
		height: 100vh;
		padding: 0 calc(var(--padding) - var(--padding-s));
		padding-top: 82px;
		border: none;
	}

	li.list-item {
      width: 145px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: var(--padding-s);
      margin-bottom: var(--padding-s);
		cursor: pointer;
		transition: background var(--transition), transform var(--transition);
		transition-timing-function: cubic-bezier(.15,1,.5,1);
		border-radius: 3rem;
		z-index: 10;
      font-weight: bold;
	}

	li.list-item:active {
		background: var(--hover);
		transform: scaleX(0.985) scaleY(0.95);
	}

	:global(nav > li.list-item i) {
      margin-left: var(--padding-s);
	}
</style>
