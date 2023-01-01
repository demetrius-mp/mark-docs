<script lang="ts">
	import { Splitpanes, Pane } from 'svelte-splitpanes';
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
	import type * as ink from 'ink-mde';
	import { themeStore } from '$lib/theme';
	import type { PageData } from './$types';

	export let data: PageData;

	let doc = {
		title: 'New document',
		description: 'Description of the document',
		content: ''
	};

	let viewMode: 'render' | 'edit' = 'render';

	let contentToRender = '';
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

	async function handleEnterKeyUpOnInvisibleInputs(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			throttledHandleSave.cancel();
			handleSave();
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

<Splitpanes>
	<Pane size={20}>
		<div class="p-2 d-flex flex-column gap-3">
			<input type="text" class="form-control" placeholder="Search documents" />
			<ul class="nav nav-pills flex-column gap-1">
				{#each data.documents as document, i}
					<li class="nav-item">
						<a class="nav-link document-pill" class:active={i === 0} aria-current="page" href="/">
							{document.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</Pane>
	<Pane size={80}>
		<div class="mx-2 mb-2">
			<div class="d-flex align-items-center justify-content-between gap-1 my-1">
				<div class="d-flex align-items-center gap-1" style="min-width: 0; flex: 1">
					<IconFileDocument style="font-size: 32px; min-width: 32px;" />

					<input
						type="text"
						style="font-size: 32px"
						class="invisible-input lead text-wrap bg-body text-body"
						maxlength={50}
						bind:value={doc.title}
						on:keyup={handleEnterKeyUpOnInvisibleInputs}
					/>
				</div>

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
				class="invisible-input w-100 bg-body text-body"
				maxlength={100}
				bind:value={doc.description}
				on:keyup={handleEnterKeyUpOnInvisibleInputs}
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

			<div class:d-none={viewMode !== 'render'} class="container mt-3 fill-height">
				<Markdown content={contentToRender} />
			</div>
		</div>
	</Pane>
</Splitpanes>

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

	.invisible-input {
		border: none;
		outline: none;
		min-width: 0;
		flex: 1;
		padding: 0px 5px;
	}

	.invisible-input:hover {
		outline: 1px solid gray;
		border-radius: 0.25em;
	}

	.invisible-input:focus {
		outline: 1px solid var(--bs-primary);
		border-radius: 0.25em;
	}

	.document-pill:not(.active):hover {
		background-color: var(--bs-primary-bg-subtle);
	}
</style>
