<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/Modal.svelte';
	import DocList from '$lib/components/Site/DocList.svelte';
	import NewDocForm from '$lib/components/Site/NewDocForm.svelte';
	import { newDocModalIsOpenStore } from '$lib/stores/newDocModalIsOpenStore';
	import { debounce } from 'lodash-es';
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	let query = '';
	$: filteredDocs = data.docs;

	function searchDocs(query: string) {
		filteredDocs = data.docs.filter(({ title }) => {
			return title.toLowerCase().includes(query.toLowerCase());
		});
	}

	const debouncedSearchDocs = debounce(searchDocs, 1000);

	$: currentDocId = $page.params.docId !== undefined ? parseInt($page.params.docId) : -1;
</script>

<Splitpanes>
	<Pane size={20}>
		<div class="p-2 d-flex flex-column gap-2">
			<input
				bind:value={query}
				type="text"
				class="form-control"
				placeholder="Search documents"
				on:input={(e) => {
					debouncedSearchDocs(e.currentTarget.value);
				}}
			/>
			<DocList docs={filteredDocs} {currentDocId} />
		</div>
	</Pane>
	<Pane size={80}>
		<slot />
	</Pane>
</Splitpanes>

<Modal open={$newDocModalIsOpenStore} id="new doc form">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="exampleModalLabel">Create a document</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<NewDocForm />
			</div>
		</div>
	</div>
</Modal>
