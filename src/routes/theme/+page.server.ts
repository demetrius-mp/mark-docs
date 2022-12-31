import { getThemeFromCookie, toggleTheme } from '$lib/theme';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies }) => {
		const themeCookie = cookies.get('theme');

		const theme = getThemeFromCookie(themeCookie);
		const nextTheme = toggleTheme(theme);

		cookies.set('theme', nextTheme, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30 * 12
		});

		return {
			theme
		};
	}
};
