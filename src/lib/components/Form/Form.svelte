<script lang="ts">
	import { applyAction, enhance, type SubmitFunction } from '$app/forms';
	import { toastStore } from '$lib/components/Toasts';
	import type { HTMLFormAttributes } from 'svelte/elements';

	interface $$Props extends HTMLFormAttributes {
		class?: string;
		toastMessage: string;
		beforeSubmit?: () => void;
		afterSubmit?: () => void;
	}

	const noop = () => {
		return;
	};

	export let beforeSubmit: () => void = noop;
	export let afterSubmit: () => void = noop;
	export let toastMessage: string;
	let klass = '';
	export { klass as class };

	let isSubmitting = false;
	const submit: SubmitFunction = () => {
		isSubmitting = true;
		beforeSubmit();
		return async ({ result }) => {
			if (result.type === 'success' || result.type === 'redirect') {
				toastStore.push({
					message: toastMessage,
					kind: 'success',
					title: 'Success',
					closeAfterMs: 3000
				});
			}

			await applyAction(result);
			afterSubmit();
			isSubmitting = false;
		};
	};
</script>

<form use:enhance={submit} class="d-flex flex-column gap-3 {klass}" {...$$restProps}>
	<slot {isSubmitting} />
</form>
