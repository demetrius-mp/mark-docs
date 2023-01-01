import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (({ locals }) => {
	if (locals.currentUser) {
		throw redirect(302, '/sign-in');
	}

	throw redirect(302, '/app');
}) satisfies PageServerLoad;
