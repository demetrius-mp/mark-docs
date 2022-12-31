<script lang="ts">
	import ink, { type Instance as InkEditor, type Options as InkOptions } from 'ink-mde';
	import { onMount } from 'svelte';

	export let options: InkOptions | undefined = undefined;
	export let value: string | undefined;
	export let editor: InkEditor | undefined = undefined;

	let editorElRef: HTMLDivElement;

	onMount(() => {
		editor = ink(editorElRef, {
			doc: value
		});
	});

	$: {
		if (editor && options) {
			editor.reconfigure(options);
		}
	}
</script>

<div bind:this={editorElRef} />

<style global>
	:global(.ͼ1.cm-editor.cm-focused) {
		outline: 0 !important;
	}

	:global(.ink-mde) {
		height: calc(100vh - 145px) !important;
	}
</style>
