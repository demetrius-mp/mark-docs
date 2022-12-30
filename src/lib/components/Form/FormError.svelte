<script lang="ts">
	import Alert from '$lib/components/Alert.svelte';
	export let errors: string[] | undefined = undefined;
</script>

{#if errors !== undefined && errors.length > 0}
	{#each errors as error}
		<Alert color="danger" dismissable>
			{error}
		</Alert>
	{/each}
{/if}
