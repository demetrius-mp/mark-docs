import { writable } from 'svelte/store';

type DocLayout = 'render' | 'edit';

function createDocLayoutStore() {
	const { set, subscribe } = writable<DocLayout>('edit');

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

export const docLayoutStore = createDocLayoutStore();
