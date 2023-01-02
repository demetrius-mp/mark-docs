<script lang="ts">
	import Select from '$lib/components/Form/Select.svelte';
	import SubmitButton from '$lib/components/Form/SubmitButton.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import IconLink from '~icons/mdi/Link';
	import { DocVisibility, SharedDocPrivileges } from '@prisma/client';
	import { page } from '$app/stores';
	import { toastStore } from '$lib/components/Toasts';

	export let open = false;
	export let uuid: string;
	export let id: number;
	export let privileges: SharedDocPrivileges;
	export let visibility: DocVisibility;

	let isSubmitting = false;
	async function handleSubmit() {
		isSubmitting = true;

		const r = await fetch(`/api/docs/${id}/visibility`, {
			method: 'POST',
			body: JSON.stringify({
				privileges,
				visibility
			})
		});

		if (r.status !== 200) {
			toastStore.push({
				kind: 'danger',
				message: 'Error setting share preferences',
				title: 'Error'
			});
		} else {
			toastStore.push({
				kind: 'success',
				message: 'Set share preferences successfully!',
				title: 'Success',
				closeAfterMs: 2000
			});

			open = false;
		}

		isSubmitting = false;
	}

	function copyLinkToClipboard() {
		console.log(`${$page.url.host}/app/docs/shared/${uuid}`);
		navigator.clipboard.writeText('');
	}
</script>

<Modal on:show={() => (open = true)} on:hide={() => (open = false)} {open} id="shareDocModal">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h1 class="modal-title fs-5" id="shareDocModal">Document visibility</h1>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<form class="d-flex flex-column gap-3" on:submit|preventDefault={handleSubmit}>
					<Select
						bind:value={visibility}
						required
						name="visibility"
						label="Who can see this document?"
					>
						<option value={DocVisibility.PRIVATE}>Private (only me)</option>
						<option value={DocVisibility.PUBLIC}>Public (anyone with the link)</option>
					</Select>

					<Select bind:value={privileges} required name="privileges" label="Privileges">
						<option value={SharedDocPrivileges.VIEWER}>Viewer (can only see the document)</option>
						<option value={SharedDocPrivileges.EDITOR}
							>Editor (can see and change the document)</option
						>
					</Select>
					<div class="d-flex justify-content-between">
						<button on:click={copyLinkToClipboard} type="button" class="btn btn-outline-primary">
							<IconLink style="vertical-align: sub;" />
							Copy link
						</button>
						<SubmitButton {isSubmitting} />
					</div>
				</form>
			</div>
		</div>
	</div>
</Modal>
