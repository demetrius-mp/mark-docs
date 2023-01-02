import { getDocByUUID } from '$lib/models/doc/queries';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

function isNumeric(value: string) {
	return /^\d+$/.test(value);
}

export const load = (async ({ parent, params }) => {
	const { docs, currentUser } = await parent();

	const docId = parseInt(params.docId);

	const doc = isNumeric(params.docId)
		? docs.find((v) => v.id === docId)
		: await getDocByUUID({
				uuid: params.docId
		  });

	if (!doc) {
		console.log(docId);
		throw error(404, 'Document not found.');
	}

	if (doc.userId !== currentUser.id && doc.visibility === 'PRIVATE') {
		throw error(404, 'Document not found');
	}

	return {
		doc
	};
}) satisfies PageServerLoad;
