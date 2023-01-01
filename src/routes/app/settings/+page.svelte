<script lang="ts">
	import Form from '$lib/components/Form/Form.svelte';
	import FormError from '$lib/components/Form/FormError.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import SubmitButton from '$lib/components/Form/SubmitButton.svelte';
	import type { PageData } from './$types';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export let form: any;
	export let data: PageData;

	const currentUser = data.currentUser;

	let fieldsToReset = {
		password: '',
		confirmPassword: ''
	};

	function resetFields() {
		fieldsToReset = {
			password: '',
			confirmPassword: ''
		};
	}
</script>

<svelte:head>
	<title>Mark Docs - Settings</title>
</svelte:head>

<main class="container mt-4">
	<FormError errors={form?.errors._errors} />

	<Form
		toastMessage="Signed up successfully!"
		action="/sign-up"
		method="post"
		afterSubmit={resetFields}
		let:isSubmitting
	>
		<Input
			name="name"
			type="text"
			label="Name"
			required
			value={form?.fields.name || currentUser.name}
			errors={form?.errors.name?._errors}
		/>
		<Input
			name="email"
			type="email"
			label="Email"
			required
			value={form?.fields.email || currentUser.email}
			errors={form?.errors.email?._errors}
		/>
		<Input
			name="newPassword"
			type="password"
			label="New password"
			minlength={8}
			value={fieldsToReset.password}
			errors={form?.errors.password?._errors}
		/>
		<Input
			name="confirmNewPassword"
			type="password"
			label="Confirm new password"
			minlength={8}
			value={fieldsToReset.confirmPassword}
			errors={form?.errors.confirmPassword?._errors}
		/>
		<Input
			name="currentPassword"
			type="password"
			label="Current password"
			minlength={8}
			required
			value={fieldsToReset.confirmPassword}
			errors={form?.errors.confirmPassword?._errors}
		/>
		<div class="d-flex justify-content-end">
			<SubmitButton {isSubmitting} />
		</div>
	</Form>
</main>
