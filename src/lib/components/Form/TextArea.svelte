<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	interface $$Props extends HTMLTextareaAttributes {
		name: string;
		label?: string;
		errors?: string[];
		class?: string;
		required?: boolean;
	}

	export let name: string;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let required: boolean | undefined = false;
	let klass = '';
	export { klass as class };

	let element: HTMLTextAreaElement;

	function resize() {
		element.style.height = 'auto';
		element.style.height = 4 + element.scrollHeight + 'px';
	}
</script>

<div>
	<label for={name} class="form-label">
		<slot name="label">
			{label}
		</slot>

		{#if required}
			<span class="text-danger"> * </span>
		{/if}
	</label>

	<textarea
		{required}
		bind:this={element}
		on:input={resize}
		class="form-control {klass}"
		{name}
		{...$$restProps}
	/>

	{#if errors !== undefined && errors.length > 0}
		<div class="invalid-feedback">
			{#each errors as error}
				{error}
			{/each}
		</div>
	{/if}
</div>
