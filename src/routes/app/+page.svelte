<script lang="ts">
	import { Ink } from 'ink-mde-svelte';
	import { toastStore } from '$lib/components/Toasts';
	import IconFileDocument from '~icons/mdi/FileDocument';
	import IconTrash from '~icons/mdi/Trash';
	import IconEye from '~icons/mdi/Eye';
	import IconPencil from '~icons/mdi/Pencil';
	import IconDotsVertical from '~icons/mdi/DotsVertical';
	import sleep from '$lib/sleep';
	import { onMount } from 'svelte';
	import { debounce, throttle } from 'lodash-es';
	import Markdown from '$lib/components/Markdown.svelte';
	import type { Instance as InkInstance } from 'ink-mde';
	import { themeStore } from '$lib/theme';

	let doc = {
		title: 'New document',
		description: 'Description of the document',
		content: ''
	};

	let viewMode: 'render' | 'edit' = 'edit';

	let contentToRender = '';
	let editorRef: InkInstance;

	function syncDoc() {
		doc.content = editorRef.getDoc();
		debouncedSetDocContent.cancel();
		contentToRender = doc.content;
	}

	function setViewModeToRender() {
		viewMode = 'render';

		syncDoc();
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

	onMount(() => {
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	});
</script>

<svelte:head>
	<title>{doc.title || 'New document'} - {doc.description}</title>
</svelte:head>

<div class="mx-2 mb-2">
	<div class="d-flex align-items-center mt-1">
		<IconFileDocument class="me-2" style="font-size: 32px; min-width: 32px;" />
		<input
			type="text"
			style="font-size: 32px;"
			class="border-0 title-input lead w-100 text-wrap bg-body text-body"
			bind:value={doc.title}
		/>

		<div class="dropdown">
			<button
				class="border-0"
				style="background-color: inherit;"
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<IconDotsVertical style="font-size: 24px;" class="text-body" />
			</button>
			<ul class="dropdown-menu">
				<li>
					<h6 class="dropdown-header text-wrap">View mode</h6>
				</li>
				<li class="mb-1">
					<button
						on:click={setViewModeToEdit}
						class:active={viewMode === 'edit'}
						class="dropdown-item"
					>
						<IconPencil style="vertical-align: text-bottom;" />
						Edit
					</button>
				</li>
				<li>
					<button
						on:click={setViewModeToRender}
						class:active={viewMode === 'render'}
						class="dropdown-item"
					>
						<IconEye style="vertical-align: text-bottom;" />
						Render
					</button>
				</li>
				<li>
					<hr class="dropdown-divider" />
				</li>
				<li>
					<button class="dropdown-item text-danger">
						<IconTrash style="vertical-align: text-bottom;" />
						Delete
					</button>
				</li>
			</ul>
		</div>
	</div>

	<input
		class="description-input ms-1 w-100 bg-body text-body"
		maxlength={100}
		bind:value={doc.description}
	/>
</div>

<hr class="m-0" />

<div>
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

	<div class:d-none={viewMode !== 'render'} class="container mt-3">
		<Markdown content={contentToRender} />
	</div>
</div>

<style>
	:global(.ͼ1.cm-editor.cm-focused) {
		outline: 0 !important;
	}

	:global(.ink-mde) {
		height: calc(100vh - 145px) !important;
	}

	.title-input {
		border: none;
		outline: none;
	}

	.description-input {
		border: none;
		outline: none;
		resize: none;
	}
</style>
