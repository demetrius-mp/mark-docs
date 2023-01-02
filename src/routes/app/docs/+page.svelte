<script lang="ts">
	import { newDocModalIsOpenStore } from '$lib/stores/newDocModalIsOpenStore';
</script>

<svelte:head>
	<title>Documents</title>
</svelte:head>

<div class="fill-height d-flex align-items-center justify-content-center">
	<button on:click={newDocModalIsOpenStore.open} class="btn btn-primary">
		Create a document!
	</button>
</div>

<style>
	.fill-height {
		height: calc(100vh - 56px);
	}
</style>
