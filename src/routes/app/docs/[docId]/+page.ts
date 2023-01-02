import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ parent, params }) => {
	const { docs } = await parent();

	const docId = parseInt(params.docId);
	const doc = docs.find((v) => v.id === docId);

	if (!doc) {
		throw error(404, 'Document not found.');
	}

	return {
		doc
	};
}) satisfies PageLoad;
