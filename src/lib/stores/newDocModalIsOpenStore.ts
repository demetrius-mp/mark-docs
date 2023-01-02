import { writable } from 'svelte/store';

function createNewDocModalIsOpenStore() {
	const { set, subscribe, update } = writable(false);

	return {
		subscribe,
		open() {
			set(true);
		},
		close() {
			set(false);
		},
		toggle() {
			update((isOpen) => !isOpen);
		}
	};
}

export const newDocModalIsOpenStore = createNewDocModalIsOpenStore();
