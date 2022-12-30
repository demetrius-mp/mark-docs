import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	const lists = [
		{
			id: 1,
			name: 'My tasks'
		}
	];

	return {
		lists
	};
}) satisfies LayoutServerLoad;
