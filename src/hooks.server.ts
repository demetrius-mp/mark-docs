import getUserFromJwt from '$lib/server/auth/jwt';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const jwt = event.cookies.get('jwt');
	const user = await getUserFromJwt(jwt);
	event.locals.currentUser = user;

	async function resolveEvent(e: typeof event) {
		return await resolve(e);
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
