<script lang="ts">
	type Doc = {
		id: number;
		title: string;
	};

	export let docs: Doc[];
	export let currentDocId: number;
</script>

<ul class="nav nav-pills flex-column gap-1">
	{#each docs as doc}
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

<style>
	.document-pill:not(.active):hover {
		background-color: var(--bs-primary-bg-subtle);
	}
</style>
