<script lang="ts">
	import { docViewModeStore } from '$lib/stores/docViewModeStore';
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

			docViewModeStore.render();
			return;
		}

		if (e.ctrlKey && e.key === 'e') {
			e.preventDefault();

			docViewModeStore.edit();
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
