<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface $$Props extends HTMLInputAttributes {
		name: string;
		label?: string;
		errors?: string[];
		class?: string;
		required?: boolean;
		value?: string;
		inner?: HTMLInputElement;
	}

	export let name: string;
	export let label: string | undefined = undefined;
	export let errors: string[] | undefined = undefined;
	export let required: boolean | undefined = false;
	export let value: string | undefined = '';

	let class_ = '';
	export { class_ as class };

	export let inner: HTMLInputElement | undefined = undefined;
</script>

<div>
	{#if label || $$slots.label}
		<label for={name} class="form-label">
			<slot name="label">
				{label}
			</slot>
			{#if required}
				<span class="text-danger"> * </span>
			{/if}
		</label>
	{/if}

	<input
		{name}
		{required}
		bind:value
		bind:this={inner}
		class:is-invalid={errors}
		class="form-control {class_}"
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
