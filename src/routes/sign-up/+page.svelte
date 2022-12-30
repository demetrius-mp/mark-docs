<script lang="ts">
	import Form from '$lib/components/Form/Form.svelte';
	import FormError from '$lib/components/Form/FormError.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import SubmitButton from '$lib/components/Form/SubmitButton.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

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
	<title>Task Manager - Sign up</title>
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
			value={form?.fields.name}
			errors={form?.errors.name?._errors}
		/>
		<Input
			name="email"
			type="email"
			label="Email"
			required
			value={form?.fields.email}
			errors={form?.errors.email?._errors}
		/>
		<Input
			name="password"
			type="password"
			label="Password"
			minlength={8}
			required
			value={fieldsToReset.password}
			errors={form?.errors.password?._errors}
		/>
		<Input
			name="confirmPassword"
			type="password"
			label="Confirm password"
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
