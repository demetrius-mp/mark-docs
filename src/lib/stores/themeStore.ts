import { type Theme, toggleTheme } from '$lib/theme';
import { writable } from 'svelte/store';

function createThemeStore() {
	const { subscribe, update, set } = writable<Theme>('light');

	return {
		subscribe,
		set,
		toggle() {
			update((value) => toggleTheme(value));
		}
	};
}

export const themeStore = createThemeStore();
