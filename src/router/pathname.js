import { writable } from 'svelte/store';

export const pathname = writable('/');

export const pathparams = writable(null);
