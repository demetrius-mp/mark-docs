import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const currentUser = locals.currentUser;

	if (!currentUser) throw redirect(302, '/sign-in');

	return {
		currentUser
	};
}) satisfies LayoutServerLoad;
