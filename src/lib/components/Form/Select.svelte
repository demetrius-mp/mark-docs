<script lang="ts">
	import type { HTMLSelectAttributes } from 'svelte/elements';

	interface $$Props extends HTMLSelectAttributes {
		name: string;
		label?: string;
		errors?: string[];
		class?: string;
		required?: boolean;
		value?: string;
	}

	export let name: string;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let required: boolean | undefined = false;
	export let value: string | undefined = undefined;
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

	<select
		bind:value
		{required}
		{name}
		class:is-invalid={errors}
		class="form-control {klass}"
		{...$$restProps}
	>
		<slot />
	</select>

	{#if errors !== undefined && errors.length > 0}
		<div class="invalid-feedback">
			{#each errors as error}
				{error}
			{/each}
		</div>
	{/if}
</div>
