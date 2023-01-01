import type { PageServerLoad } from './$types';

export const load = (async () => {
	return {
		documents: [
			{
				id: 1,
				title: 'My first document'
			},
			{
				id: 1,
				title: 'My second document'
			},
			{
				id: 1,
				title: 'Home tasks'
			}
		]
	};
}) satisfies PageServerLoad;
