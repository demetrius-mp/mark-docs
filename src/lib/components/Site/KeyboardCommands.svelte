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
		if (e.ctrlKey && e.key === 's') {
			e.preventDefault();

			dispatch('save');
			return;
		}

		if (e.ctrlKey && e.key === 'r') {
			e.preventDefault();

			docLayoutStore.render();
			return;
		}

		if (e.ctrlKey && e.key === 'e') {
			e.preventDefault();

			docLayoutStore.edit();
			return;
		}

		if (e.ctrlKey && e.key === 'd') {
			e.preventDefault();

			newDocModalIsOpenStore.toggle();
			return;
		}

		if (e.ctrlKey && e.key === 'b') {
			e.preventDefault();

			docListPaneSizeStore.toggle();
			return;
		}

		if (e.ctrlKey && e.shiftKey && e.key === 'F') {
			e.preventDefault();

			searchDocumentsInputStore.focus();

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
