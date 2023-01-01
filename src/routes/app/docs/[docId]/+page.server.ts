import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent, params }) => {
	const { docs } = await parent();

	const docId = parseInt(params.docId);
	const doc = docs.find((v) => v.id === docId);

	if (!doc) {
		throw error(404, 'Document not found.');
	}

	return {
		doc: {
			...doc,
			description: `Description of my ${docId} document!`,
			content: `# Hello from my ${docId} document!`
		}
	};
}) satisfies PageServerLoad;
