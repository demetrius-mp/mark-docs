<script lang="ts">
	import { page } from '$app/stores';
	import { debounce } from 'lodash-es';
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import type { LayoutServerData } from './$types';

	export let data: LayoutServerData;

	let query = '';
	let filteredDocs = data.docs;

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
		<div class="p-2 d-flex flex-column gap-3">
			<input
				bind:value={query}
				type="text"
				class="form-control"
				placeholder="Search documents"
				on:input={(e) => {
					debouncedSearchDocs(e.currentTarget.value);
				}}
			/>
			<ul class="nav nav-pills flex-column gap-1">
				{#each filteredDocs as doc}
					<li class="nav-item">
						<a
							class="nav-link document-pill"
							class:active={currentDocId === doc.id}
							aria-current="page"
							href="/app/docs/{doc.id}"
						>
							{doc.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</Pane>
	<Pane size={80}>
		<slot />
	</Pane>
</Splitpanes>

<style>
	.document-pill:not(.active):hover {
		background-color: var(--bs-primary-bg-subtle);
	}
</style>
