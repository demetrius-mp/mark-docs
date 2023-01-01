import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ parent }) => {
	const { docs } = await parent();

	if (docs.length !== 0) {
		// we know for sure there is at least one element.
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		const firstDocumentId = docs.at(0)!.id;
		throw redirect(302, `/app/docs/${firstDocumentId}`);
	}
}) satisfies PageServerLoad;
