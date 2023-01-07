<script lang="ts">
	import { newDocModalIsOpenStore } from '$lib/stores/newDocModalIsOpenStore';
	import { Pane } from 'svelte-splitpanes';
</script>

<svelte:head>
	<title>Documents</title>
</svelte:head>

<Pane>
	<div class="fill-height d-flex align-items-center justify-content-center">
		<button on:click={newDocModalIsOpenStore.open} class="btn btn-primary">
			Create a document!
		</button>
	</div>
</Pane>

<style>
	.fill-height {
		height: calc(100vh - 56px);
	}
</style>
