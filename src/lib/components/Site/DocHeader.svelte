<script lang="ts">
	import IconFileDocument from '~icons/mdi/FileDocument';
	import IconTrash from '~icons/mdi/Trash';
	import IconEye from '~icons/mdi/Eye';
	import IconPencil from '~icons/mdi/Pencil';
	import IconDotsVertical from '~icons/mdi/DotsVertical';
	import { createEventDispatcher } from 'svelte';
	import { docViewModeStore } from '$lib/stores/docViewModeStore';

	export let title: string;
	export let description: string;

	type Events = {
		save: void;
	};

	const dispatch = createEventDispatcher<Events>();

	async function handleEnterKeyUpOnInvisibleInputs(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			dispatch('save');
		}
	}
</script>

<div class="mx-2 mb-2">
	<div class="d-flex align-items-center justify-content-between gap-1 my-1">
		<div class="d-flex align-items-center gap-1" style="min-width: 0; flex: 1">
			<IconFileDocument style="font-size: 32px; min-width: 32px;" />

			<input
				type="text"
				style="font-size: 32px"
				class="invisible-input lead text-wrap bg-body text-body"
				maxlength={50}
				bind:value={title}
				on:keyup={handleEnterKeyUpOnInvisibleInputs}
			/>
		</div>

		<div class="dropdown">
			<button
				class="border-0"
				style="background-color: inherit;"
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				<IconDotsVertical style="font-size: 24px;" class="text-body" />
			</button>
			<ul class="dropdown-menu">
				<li>
					<h6 class="dropdown-header text-wrap">View mode</h6>
				</li>
				<li class="mb-1">
					<button
						on:click={docViewModeStore.edit}
						class:active={$docViewModeStore === 'edit'}
						class="dropdown-item"
					>
						<IconPencil style="vertical-align: text-bottom;" />
						Edit
					</button>
				</li>
				<li>
					<button
						on:click={docViewModeStore.render}
						class:active={$docViewModeStore === 'render'}
						class="dropdown-item"
					>
						<IconEye style="vertical-align: text-bottom;" />
						Render
					</button>
				</li>
				<li>
					<hr class="dropdown-divider" />
				</li>
				<li>
					<button class="dropdown-item text-danger">
						<IconTrash style="vertical-align: text-bottom;" />
						Delete
					</button>
				</li>
			</ul>
		</div>
	</div>

	<input
		class="invisible-input w-100 bg-body text-body"
		maxlength={100}
		bind:value={description}
		on:keyup={handleEnterKeyUpOnInvisibleInputs}
	/>
</div>

<style>
	.invisible-input {
		border: none;
		outline: none;
		min-width: 0;
		flex: 1;
		padding: 0px 5px;
	}

	.invisible-input:hover {
		outline: 1px solid gray;
		border-radius: 0.25em;
	}

	.invisible-input:focus {
		outline: 1px solid var(--bs-primary);
		border-radius: 0.25em;
	}
</style>