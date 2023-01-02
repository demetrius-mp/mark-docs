<script lang="ts">
	import { docListPaneSizeStore } from '$lib/stores/docListPaneSizeStore';
	import { newDocModalIsOpenStore } from '$lib/stores/newDocModalIsOpenStore';
	import IconFileDocumentPlus from '~icons/mdi/FileDocumentPlus';

	type Doc = {
		id: number;
		title: string;
		description: string;
	};

	export let docs: Doc[];
	export let currentDocId: number;
</script>

<div class="doc-list">
	<ul class="nav nav-pills flex-column gap-1">
		<li class="nav-item">
			<button
				on:click={newDocModalIsOpenStore.open}
				class="nav-link document-pill w-100 text-start"
			>
				<IconFileDocumentPlus style="vertical-align: text-bottom;" />
				Create new document
			</button>
		</li>
		{#each docs as doc}
			<li class="nav-item">
				<a
					class="nav-link document-pill"
					class:active={currentDocId === doc.id}
					aria-current="page"
					href="/app/docs/{doc.id}"
				>
					{doc.title}
					<br />
					<small style="width: {$docListPaneSizeStore - 6}vw" class="text-truncate d-block">
						> {doc.description}
					</small>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.document-pill:not(.active):hover {
		background-color: var(--bs-primary-bg-subtle);
	}

	.doc-list {
		height: calc(100vh - 126px);
		overflow-y: auto;
	}
</style>
