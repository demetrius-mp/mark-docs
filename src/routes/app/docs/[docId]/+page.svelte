<script lang="ts">
	import { Ink } from 'ink-mde-svelte';
	import { toastStore } from '$lib/components/Toasts';
	import sleep from '$lib/utils/sleep';
	import { debounce, throttle } from 'lodash-es';
	import Markdown from '$lib/components/Markdown.svelte';
	import type * as ink from 'ink-mde';
	import { themeStore } from '$lib/stores/themeStore';
	import type { PageData } from './$types';
	import DocHeader from '$lib/components/Site/DocHeader.svelte';
	import { docLayoutStore } from '$lib/stores/docLayoutStore';
	import KeyboardCommands from '$lib/components/Site/KeyboardCommands.svelte';
	import { docsStore } from '$lib/stores/docsStore';
	import { Pane } from 'svelte-splitpanes';
	import { browser } from '$app/environment';
	import DOMPurify from 'dompurify';
	import { marked } from 'marked';

	export let data: PageData;
	$: doc = data.doc;

	$: {
		if (editorRef) {
			editorRef.update(data.doc.content);
		}
	}

	// let contentToRender = data.doc.content;
	let editorRef: ink.Instance;

	// new
	function renderToMarkdown(value: string) {
		return DOMPurify.sanitize(marked(value));
	}
	let renderedContent = '';
	$: {
		if (browser && doc.content) {
			renderedContent = renderToMarkdown(doc.content);
		}
	}
	// end: new

	function syncDoc() {
		if (!editorRef) return;

		doc.content = editorRef.getDoc();
	}

	$: {
		if ($docLayoutStore === 'render') {
			syncDoc();
			renderedContent = renderToMarkdown(doc.content);
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

			docsStore.updateById({
				id: doc.id,
				title: doc.title,
				description: doc.description
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

	function handleDocHeaderSave() {
		throttledHandleSave.cancel();
		handleSave();
	}

	const handleInkAfterUpdate = debounce((value: string) => {
		doc.content = value;
	}, 1000);
</script>

<svelte:head>
	<title>
		{doc.title} - {doc.description}
	</title>
</svelte:head>

<KeyboardCommands on:save={throttledHandleSave} />

<Pane>
	<DocHeader
		id={doc.id}
		uuid={doc.uuid}
		privileges={doc.sharePrivileges}
		visibility={doc.visibility}
		bind:title={doc.title}
		bind:description={doc.description}
		on:save={handleDocHeaderSave}
	/>

	<hr class="m-0" />

	<div class:d-none={$docLayoutStore === 'render'}>
		<Ink
			on:afterUpdate={({ detail }) => handleInkAfterUpdate(detail)}
			bind:editor={editorRef}
			options={{
				interface: {
					appearance: $themeStore,
					toolbar: true
				}
			}}
		/>
	</div>

	{#if $docLayoutStore === 'render'}
		<Markdown style="height: calc(100vh - 145px);" class="p-3" content={renderedContent} />
	{/if}
</Pane>

{#if $docLayoutStore === 'hybrid'}
	<Pane snapSize={20}>
		<Markdown style="height: calc(100vh - 56px);" class="p-3" content={renderedContent} />
	</Pane>
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
</style>
