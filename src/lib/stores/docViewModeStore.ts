import { writable } from 'svelte/store';

type DocViewMode = 'render' | 'edit';

function createDocViewModeStore() {
	const { set, subscribe } = writable<DocViewMode>('render');

	return {
		subscribe,
		render() {
			set('render');
		},
		edit() {
			set('edit');
		}
	};
}

export const docViewModeStore = createDocViewModeStore();
