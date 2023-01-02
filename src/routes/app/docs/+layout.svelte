<script lang="ts">
	import { page } from '$app/stores';
	import DocList from '$lib/components/Site/DocList.svelte';
	import NewDocForm from '$lib/components/Site/NewDocForm.svelte';
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

<NewDocForm />
