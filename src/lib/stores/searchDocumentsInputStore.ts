import { get, writable } from 'svelte/store';

function createSearchDocumentsInputStore() {
	const { set, subscribe } = writable<HTMLInputElement | undefined>(undefined);

	return {
		subscribe,
		set,
		focus() {
			const inputEl = get({ subscribe });
			if (!inputEl) return;

			inputEl.focus({
				preventScroll: false
			});
		}
	};
}

export const searchDocumentsInputStore = createSearchDocumentsInputStore();
