import getUserFromJwt from '$lib/server/auth/jwt';
import { getThemeFromCookie } from '$lib/theme';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const jwt = event.cookies.get('jwt');
	const user = await getUserFromJwt(jwt);
	event.locals.currentUser = user;

	const themeCookie = event.cookies.get('theme');

	const theme = getThemeFromCookie(themeCookie);
	event.locals.theme = theme;

	async function resolveEvent(e: typeof event) {
		return await resolve(e, {
			transformPageChunk({ html }) {
				return html.replace('%custom.theme%', theme);
			}
		});
	}

	const routeId = event.route.id;

	if (routeId?.startsWith('/app')) {
		if (!user) {
			throw redirect(302, '/sign-in');
		}
	}

	const resolvedEvent = await resolveEvent(event);
	return resolvedEvent;
};
