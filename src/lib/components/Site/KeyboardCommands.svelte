<script lang="ts">
	import { docListPaneSizeStore } from '$lib/stores/docListPaneSizeStore';
	import { docLayoutStore } from '$lib/stores/docLayoutStore';
	import { newDocModalIsOpenStore } from '$lib/stores/newDocModalIsOpenStore';
	import { searchDocumentsInputStore } from '$lib/stores/searchDocumentsInputStore';
	import { onMount, createEventDispatcher } from 'svelte';

	type Events = {
		save: void;
	};

	const dispatch = createEventDispatcher<Events>();

	async function handleKeyDown(e: KeyboardEvent) {
		const isCommandEntry = e.ctrlKey && e.shiftKey;

		if (!isCommandEntry) return;

		const COMMAND_KEYS = {
			SAVE: 'S',
			FOCUS_SEARCH_INPUT: 'F',
			NEW_DOC: 'D',
			TOGGLE_DOC_LIST: 'B',
			RENDER_LAYOUT: 'R',
			EDIT_LAYOUT: 'E',
			HYBRID_LAYOUT: 'H'
		};

		if (e.key === COMMAND_KEYS.SAVE) {
			e.preventDefault();

			dispatch('save');
			return;
		}

		if (e.key === COMMAND_KEYS.RENDER_LAYOUT) {
			e.preventDefault();

			docLayoutStore.render();
			return;
		}

		if (e.key === COMMAND_KEYS.EDIT_LAYOUT) {
			e.preventDefault();

			docLayoutStore.edit();
			return;
		}

		if (e.key === COMMAND_KEYS.HYBRID_LAYOUT) {
			e.preventDefault();

			docLayoutStore.hybrid();

			return;
		}

		if (e.key === COMMAND_KEYS.FOCUS_SEARCH_INPUT) {
			e.preventDefault();

			searchDocumentsInputStore.focus();

			return;
		}

		if (e.key === COMMAND_KEYS.NEW_DOC) {
			e.preventDefault();

			newDocModalIsOpenStore.toggle();
			return;
		}

		if (e.key === COMMAND_KEYS.TOGGLE_DOC_LIST) {
			e.preventDefault();

			docListPaneSizeStore.toggle();
			return;
		}
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>
