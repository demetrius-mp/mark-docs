<script lang="ts">
	import { page } from '$app/stores';
	import DocList from '$lib/components/Site/DocList.svelte';
	import NewDocForm from '$lib/components/Site/NewDocForm.svelte';
	import { docListPaneSizeStore } from '$lib/stores/docListPaneSizeStore';
	import { docsStore } from '$lib/stores/docsStore';
	import { debounce } from 'lodash-es';
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	$: $docsStore = data.docs;

	let query = '';
	$: filteredDocs = $docsStore;

	function searchDocs(query: string) {
		filteredDocs = $docsStore.filter(({ title }) => {
			return title.toLowerCase().includes(query.toLowerCase());
		});
	}

	const debouncedSearchDocs = debounce(searchDocs, 1000);

	$: currentDocId = $page.params.docId !== undefined ? parseInt($page.params.docId) : -1;
</script>

<Splitpanes>
	<Pane bind:size={$docListPaneSizeStore} snapSize={18}>
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

	<Pane>
		<slot />
	</Pane>
</Splitpanes>

<NewDocForm />
