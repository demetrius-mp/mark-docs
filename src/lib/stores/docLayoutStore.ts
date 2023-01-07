import { writable } from 'svelte/store';

type DocLayout = 'render' | 'edit' | 'hybrid';

function createDocLayoutStore() {
	const { set, subscribe } = writable<DocLayout>('edit');

	return {
		subscribe,
		render() {
			set('render');
		},
		edit() {
			set('edit');
		},
		hybrid() {
			set('hybrid');
		}
	};
}

export const docLayoutStore = createDocLayoutStore();
