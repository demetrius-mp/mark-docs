<script lang="ts">
	import Form from '$lib/components/Form/Form.svelte';
	import FormError from '$lib/components/Form/FormError.svelte';
	import Input from '$lib/components/Form/Input.svelte';
	import SubmitButton from '$lib/components/Form/SubmitButton.svelte';
	import type { ActionData } from './$types';

	export let form: ActionData;

	let fieldsToReset = {
		password: ''
	};

	function resetFields() {
		fieldsToReset = {
			password: ''
		};
	}
</script>

<svelte:head>
	<title>Task Manager - Sign in</title>
</svelte:head>

<main class="container mt-4">
	<FormError errors={form?.errors._errors} />

	<Form
		toastMessage="Signed in successfully!"
		action="/sign-in"
		method="post"
		afterSubmit={resetFields}
		let:isSubmitting
	>
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
		<div class="d-flex justify-content-end">
			<SubmitButton {isSubmitting} />
		</div>
	</Form>
</main>
