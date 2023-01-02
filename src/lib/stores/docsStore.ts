import type { getAllDocsByUserId } from '$lib/models/doc/queries';
import type { AsyncReturnType } from '$lib/types';
import { writable } from 'svelte/store';

function createDocsStore() {
	const { subscribe, update, set } = writable<AsyncReturnType<typeof getAllDocsByUserId>>([]);

	return {
		subscribe,
		set,
		updateById(req: { description: string; title: string; id: number }) {
			update((docs) => {
				return docs.map((doc) => {
					if (doc.id === req.id) {
						doc.title = req.title;
						doc.description = req.description;
						return doc;
					} else {
						return doc;
					}
				});
			});
		}
	};
}

export const docsStore = createDocsStore();
