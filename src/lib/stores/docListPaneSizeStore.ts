import { writable } from 'svelte/store';

function createDocListPaneSizeStore() {
	const { set, subscribe, update } = writable(25);

	return {
		subscribe,
		set,
		update,
		open() {
			set(25);
		},
		close() {
			set(0);
		},
		toggle() {
			update((size) => {
				if (size >= 25) return 0;
				return 25;
			});
		}
	};
}

export const docListPaneSizeStore = createDocListPaneSizeStore();
