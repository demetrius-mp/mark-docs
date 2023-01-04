<script lang="ts">
	import { goto, invalidateAll } from '$app/navigation';
	import Input from '$lib/components/Form/Input.svelte';
	import SubmitButton from '$lib/components/Form/SubmitButton.svelte';
	import TextArea from '$lib/components/Form/TextArea.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { createDoc } from '$lib/models/doc/mutations';
	import { createDocSchema } from '$lib/models/doc/schemas';
	import { newDocModalIsOpenStore } from '$lib/stores/newDocModalIsOpenStore';
	import type { AsyncReturnType } from '$lib/types';
	import type { z } from 'zod';

	let form: z.input<typeof createDocSchema> = {
		description: '',
		title: ''
	};

	let errors: z.ZodFormattedError<typeof createDocSchema>;

	let isSubmitting = false;
	async function handleSubmit() {
		isSubmitting = true;

		const parsed = await createDocSchema.spa(form);

		if (!parsed.success) {
			errors = parsed.error.format();
			isSubmitting = false;
			return;
		}

		const r = await fetch('/api/docs', {
			method: 'POST',
			body: JSON.stringify(form)
		});

		const json = await r.json();

		if (r.status === 422) {
			errors = json.errors;
			isSubmitting = false;
			return;
		}

		const data = json.data as AsyncReturnType<typeof createDoc>;

		await invalidateAll();
		await goto(`/app/docs/${data.id}`);

		isSubmitting = false;

		newDocModalIsOpenStore.close();

		form = {
			title: '',
			description: ''
		};
	}

	let titleInputEl: HTMLInputElement | undefined;
</script>

<Modal
	on:show={newDocModalIsOpenStore.open}
	on:shown={() => titleInputEl?.focus()}
	on:hide={newDocModalIsOpenStore.close}
	on:hidden={() => titleInputEl?.blur()}
	open={$newDocModalIsOpenStore}
	id="newDocForm"
>
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="newDocForm">Create a document</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<form class="d-flex flex-column gap-3" on:submit|preventDefault={handleSubmit}>
					<Input
						bind:inner={titleInputEl}
						bind:value={form.title}
						required
						maxlength={50}
						name="title"
						label="Title"
					/>
					<TextArea
						bind:value={form.description}
						required
						maxlength={100}
						name="description"
						label="Description"
					/>

					<div class="d-flex justify-content-between">
						<button data-bs-dismiss="modal" type="button" class="btn btn-secondary">
							Cancel
						</button>
						<SubmitButton {isSubmitting} />
					</div>
				</form>
			</div>
		</div>
	</div>
</Modal>
