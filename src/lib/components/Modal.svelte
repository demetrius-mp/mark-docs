<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import type { Modal } from 'bootstrap';

	export let id: string;
	export let open = false;

	type Events = {
		show: void;
		shown: void;
		hide: void;
		hidden: void;
	};

	const eventDispatcher = createEventDispatcher<Events>();

	const dispatch = {
		show: () => eventDispatcher('show'),
		shown: () => eventDispatcher('shown'),
		hide: () => eventDispatcher('hide'),
		hidden: () => eventDispatcher('hidden')
	};

	let divElement: HTMLDivElement;
	let modal: Modal;
	onMount(async () => {
		const { default: Modal } = await import('bootstrap/js/dist/modal');

		modal = new Modal(divElement);

		divElement.addEventListener('show.bs.modal', dispatch.show);
		divElement.addEventListener('shown.bs.modal', dispatch.shown);
		divElement.addEventListener('hide.bs.modal', dispatch.hide);
		divElement.addEventListener('hidden.bs.modal', dispatch.hidden);
	});

	onDestroy(() => {
		if (modal) {
			modal.dispose();
		}

		if (divElement) {
			divElement.removeEventListener('show.bs.modal', dispatch.show);
			divElement.removeEventListener('shown.bs.modal', dispatch.shown);
			divElement.removeEventListener('hide.bs.modal', dispatch.hide);
			divElement.removeEventListener('hidden.bs.modal', dispatch.hidden);
		}
	});

	$: {
		if (modal) {
			if (open) modal.show();
			else modal.hide();
		}
	}
</script>

<div
	bind:this={divElement}
	class="modal fade"
	tabindex="-1"
	aria-labelledby={id}
	aria-hidden="true"
>
	<slot />
</div>
