import { writable } from 'svelte/store';

// Cards
export const cards = writable(JSON.parse(localStorage.getItem('cards')));

// Context menu
export const contextMenu = writable({
   isOpen: false, 
   card: {}, 
   pos: {x: 0, y: 0}, 
   toggleState: null, 
   deleteCard: null
});

// Search
export const searchText = writable('');
