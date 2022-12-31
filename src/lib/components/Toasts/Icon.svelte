<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';
	import type { Kind } from './types';
	export let kind: Kind = 'success';
	export let size = 18;
</script>

{#if kind === 'loading'}
	<Spinner class="me-2" sm />
{:else}
	<svg
		class={`rounded text-${kind} me-2`}
		width={size}
		height={size}
		xmlns="http://www.w3.org/2000/svg"
		preserveAspectRatio="xMidYMid slice"
		focusable="false"
		role="img"
	>
		<rect fill="currentColor" width="100%" height="100%" />
	</svg>
{/if}
