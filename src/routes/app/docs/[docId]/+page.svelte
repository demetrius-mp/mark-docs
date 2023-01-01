<script lang="ts">
	import { Ink } from 'ink-mde-svelte';
	import { toastStore } from '$lib/components/Toasts';
	import sleep from '$lib/sleep';
	import { onMount } from 'svelte';
	import { debounce, throttle } from 'lodash-es';
	import Markdown from '$lib/components/Markdown.svelte';
	import type * as ink from 'ink-mde';
	import { themeStore } from '$lib/theme';
	import type { PageData } from './$types';
	import DocHeader from '$lib/components/Site/DocHeader.svelte';

	export let data: PageData;
	$: doc = data.doc;

	$: {
		if (editorRef) {
			editorRef.update(data.doc.content);
		}
	}

	let viewMode: 'render' | 'edit' = 'edit';

	let contentToRender = data.doc.content;
	let editorRef: ink.Instance;

	function syncDoc() {
		doc.content = editorRef.getDoc();
		debouncedSetDocContent.cancel();
	}

	function setViewModeToRender() {
		viewMode = 'render';

		syncDoc();
		contentToRender = doc.content;
	}

	function setViewModeToEdit() {
		viewMode = 'edit';
	}

	async function handleSave() {
		syncDoc();

		const id = toastStore.push({
			kind: 'loading',
			message: 'Saving document...',
			title: 'Loading'
		});

		await sleep(3000);

		toastStore.close(id);
		await sleep(450);

		toastStore.push({
			kind: 'success',
			message: 'Document saved successfully!',
			title: 'Success',
			closeAfterMs: 2000
		});
	}

	const throttledHandleSave = throttle(handleSave, 5000);

	function setDocContent(content: string) {
		doc.content = content;
	}

	const debouncedSetDocContent = debounce(setDocContent, 3000);

	async function handleKeyDown(e: KeyboardEvent) {
		if (e.ctrlKey && e.key === 's') {
			e.preventDefault();

			throttledHandleSave();
			return;
		}

		if (e.ctrlKey && e.key === 'r') {
			e.preventDefault();

			setViewModeToRender();
			return;
		}

		if (e.ctrlKey && e.key === 'e') {
			e.preventDefault();

			setViewModeToEdit();
			return;
		}
	}

	function handleDocHeaderSave() {
		throttledHandleSave.cancel();
		handleSave();
	}

	onMount(() => {
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<svelte:head>
	<title>
		{doc.title} - {doc.description}
	</title>
</svelte:head>

<DocHeader
	bind:title={doc.title}
	bind:description={doc.description}
	{viewMode}
	on:save={handleDocHeaderSave}
/>

<hr class="m-0" />

<div class:d-none={viewMode !== 'edit'}>
	<Ink
		bind:editor={editorRef}
		options={{
			hooks: {
				afterUpdate: debouncedSetDocContent
			},
			interface: {
				appearance: $themeStore,
				toolbar: true
			}
		}}
	/>
</div>

{#if viewMode === 'render'}
	<div class="container mt-3 fill-height">
		<Markdown content={contentToRender} />
	</div>
{/if}

<style>
	:global(.ͼ1.cm-editor.cm-focused) {
		outline: 0 !important;
	}

	:global(.ink-mde) {
		height: calc(100vh - 145px) !important;
	}

	:global(.ink-mde) {
		border: none !important;
	}

	.fill-height {
		height: calc(100vh - 161px) !important;
	}
</style>
