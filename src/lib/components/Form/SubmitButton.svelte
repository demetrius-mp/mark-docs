<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';

	export let isSubmitting = false;
	let klass = 'btn-primary';
	export { klass as class };
</script>

<button disabled={isSubmitting} class="btn btn-primary {klass}">
	{#if isSubmitting}
		<Spinner sm />
	{:else}
		<slot name="icon" />
	{/if}

	<slot>Submit</slot>
</button>
