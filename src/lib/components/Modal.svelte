<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import type { Modal } from 'bootstrap';

	export let id: string;
	export let open = false;

	let divElement: HTMLDivElement;
	let modal: Modal;
	onMount(async () => {
		const { default: Modal } = await import('bootstrap/js/dist/modal');

		modal = new Modal(divElement);
	});

	onDestroy(() => {
		if (modal) {
			return modal.dispose;
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
