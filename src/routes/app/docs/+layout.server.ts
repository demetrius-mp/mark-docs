import { getAllDocsByUserId } from '$lib/models/doc/queries';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { currentUser } = await parent();
	const docs = await getAllDocsByUserId({
		userId: currentUser.id
	});

	return {
		docs
	};
}) satisfies LayoutServerLoad;
