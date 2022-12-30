<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';
	import toastStore from './toastStore';
	import Icon from './Icon.svelte';

	const positionClass = {
		'top-left': 'top-0 start-0',
		'top-center': 'top-0 start-50 translate-middle-x',
		'top-right': 'top-0 end-0',
		'middle-left': 'top-50 start-0 translate-middle-y',
		'middle-center': 'top-50 start-50 translate-middle',
		'middle-right': 'top-50 end-0 translate-middle-y',
		'bottom-left': 'bottom-0 start-0',
		'bottom-center': 'bottom-0 start-50 translate-middle-x',
		'bottom-right': 'bottom-0 end-0'
	};

	type Position = keyof typeof positionClass;
	export let position: Position = 'bottom-right';

	export let spacing = '0.75rem';
	export let maxWidth = '300px';
</script>

{#if $toastStore.length}
	<div
		style="z-index: 10;"
		class="toast-container position-fixed {positionClass[position]} margins"
	>
		{#each $toastStore as toast (toast.id)}
			<div
				style:--bs-toast-spacing={spacing}
				style:--bs-toast-max-width={maxWidth}
				class="toast show"
				role="alert"
				aria-live="assertive"
				aria-atomic="true"
				animate:flip
				transition:fade
			>
				<div class="toast-header">
					<Icon kind={toast.kind} />
					<strong class="me-auto">{toast.title}</strong>
					<button
						type="button"
						class="btn-close"
						aria-label="Close"
						on:click={() => toastStore.close(toast.id)}
					/>
				</div>
				<div class="toast-body">
					{toast.message}
				</div>
			</div>
		{/each}
	</div>
{/if}

<style>
	.margins {
		--margin: calc(0.5rem + 7px);
		margin-top: var(--margin);
		margin-bottom: var(--margin);
		margin-left: var(--margin);
		margin-right: var(--margin);
	}
</style>
