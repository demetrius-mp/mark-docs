<script lang="ts">
	import { Ink } from 'ink-mde-svelte';
	import { toastStore } from '$lib/components/Toasts';
	import sleep from '$lib/sleep';
	import { debounce, throttle } from 'lodash-es';
	import Markdown from '$lib/components/Markdown.svelte';
	import type * as ink from 'ink-mde';
	import { themeStore } from '$lib/stores/themeStore';
	import type { PageData } from './$types';
	import DocHeader from '$lib/components/Site/DocHeader.svelte';
	import { docViewModeStore } from '$lib/stores/docViewModeStore';
	import KeyboardCommands from '$lib/components/Site/KeyboardCommands.svelte';

	export let data: PageData;
	$: doc = data.doc;

	$: {
		if (editorRef) {
			editorRef.update(data.doc.content);
		}
	}

	let contentToRender = data.doc.content;
	let editorRef: ink.Instance;

	function syncDoc() {
		doc.content = editorRef.getDoc();
		debouncedSetDocContent.cancel();
	}

	$: {
		if ($docViewModeStore === 'render') {
			syncDoc();
			contentToRender = doc.content;
		}
	}

	async function handleSave() {
		syncDoc();

		const id = toastStore.push({
			kind: 'loading',
			message: 'Saving document...',
			title: 'Loading'
		});

		const r = await fetch(`/api/docs/${doc.id}`, {
			method: 'POST',
			body: JSON.stringify({
				title: doc.title,
				description: doc.description,
				content: doc.content
			})
		});

		toastStore.close(id);
		await sleep(450);

		if (r.status === 200) {
			toastStore.push({
				kind: 'success',
				message: 'Document saved successfully!',
				title: 'Success',
				closeAfterMs: 2000
			});
		} else {
			toastStore.push({
				kind: 'danger',
				message: 'Error saving the document.',
				title: 'Error'
			});
		}
	}

	const throttledHandleSave = throttle(handleSave, 5000);

	function setDocContent(content: string) {
		doc.content = content;
	}

	const debouncedSetDocContent = debounce(setDocContent, 3000);

	function handleDocHeaderSave() {
		throttledHandleSave.cancel();
		handleSave();
	}
</script>

<svelte:head>
	<title>
		{doc.title} - {doc.description}
	</title>
</svelte:head>

<KeyboardCommands on:save={throttledHandleSave} />

<DocHeader
	id={doc.id}
	bind:title={doc.title}
	bind:description={doc.description}
	on:save={handleDocHeaderSave}
/>

<hr class="m-0" />

<div class:d-none={$docViewModeStore !== 'edit'}>
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

{#if $docViewModeStore === 'render'}
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
