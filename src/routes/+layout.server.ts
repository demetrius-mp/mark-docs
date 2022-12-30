import type { LayoutServerLoad } from './$types';

export const load = (({ locals }) => {
	return {
		currentUser: locals.currentUser
	};
}) satisfies LayoutServerLoad;
