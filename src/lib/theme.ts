import { writable } from 'svelte/store';

export const themes = ['light', 'dark'] as const;

export type Theme = typeof themes[number];

export function isTheme(value: unknown): value is Theme {
	return typeof value === 'string' && themes.includes(value as Theme);
}

export function toggleTheme(currentTheme: Theme): Theme {
	return currentTheme === 'dark' ? 'light' : 'dark';
}

export function getThemeFromCookie(cookie?: string): Theme {
	if (!cookie || !isTheme(cookie)) return 'light';

	return cookie;
}

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
