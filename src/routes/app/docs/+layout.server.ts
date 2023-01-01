import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	const docs = [
		{
			id: 1,
			title: 'My first document'
		},
		{
			id: 2,
			title: 'My second document'
		},
		{
			id: 3,
			title: 'Home tasks'
		}
	];

	return {
		docs
	};
}) satisfies LayoutServerLoad;
