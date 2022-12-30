<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
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

	<input
		{name}
		{required}
		class:is-invalid={errors}
		class="form-control {klass}"
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
