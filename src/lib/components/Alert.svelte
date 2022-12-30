<script lang="ts">
	import type { BootstrapColor } from '$lib/components/types';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	interface $$Props extends HTMLBaseAttributes {
		class?: string;
		color?: BootstrapColor;
		dismissable?: boolean;
	}

	let klass = '';
	export { klass as class };

	export let color: BootstrapColor = 'success';
	export let dismissable = false;
</script>

<div
	{...$$restProps}
	class:alert-dismissible={dismissable}
	class="alert alert-{color} fade show {klass}"
	role="alert"
>
	<slot />
	{#if dismissable}
		<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" />
	{/if}
</div>
