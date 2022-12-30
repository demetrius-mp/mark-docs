<script lang="ts">
	import type { LayoutData } from './$types';
	import { Splitpanes, Pane } from 'svelte-splitpanes';
	import { page } from '$app/stores';

	export let data: LayoutData;

	$: activeListId = $page.params.listId;
</script>

<Splitpanes class="custom" style="height: calc(100vh - 56px);">
	<Pane minSize={20} size={20}>
		<div class="m-3 d-flex flex-column gap-2">
			<input class="form-control" placeholder="Start typing..." />

			<ul class="nav nav-pills flex-column gap-1">
				{#each data.lists as list (list.id)}
					<li class="nav-item">
						<a
							class="nav-link"
							class:active={list.id.toString() === activeListId}
							href="/app/lists/{list.id}"
						>
							{list.name}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</Pane>
	<slot />
</Splitpanes>
