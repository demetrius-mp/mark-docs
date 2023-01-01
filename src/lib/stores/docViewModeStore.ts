import { writable } from 'svelte/store';

type DocViewMode = 'render' | 'edit';

function createDocViewModeStore() {
	const { set, subscribe } = writable<DocViewMode>('edit');

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
