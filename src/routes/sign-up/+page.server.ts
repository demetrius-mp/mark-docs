import type { Actions, PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import type { z } from 'zod';
import { signUpSchema, emailAlreadyBeingUsedValidationError } from '$lib/models/user/schemas';
import formDataToJSON from '$lib/server/formDataToJSON';
import formValidationError from '$lib/server/formValidationError';
import { userExistsWithEmail } from '$lib/models/user/queries';
import { createUser } from '$lib/models/user/mutations';

export const load = (({ locals }) => {
	if (locals.currentUser) throw redirect(302, '/app');
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		type Input = z.input<typeof signUpSchema>;

		type Response = {
			errors: z.ZodFormattedError<Input>;
			fields: Omit<Input, 'password' | 'confirmPassword'>;
		};

		const dirtyFields = formDataToJSON(await request.formData()) as Input;

		const parsed = await signUpSchema.spa(dirtyFields);

		if (!parsed.success) {
			return formValidationError<Response>({
				errors: parsed.error.format(),
				fields: {
					email: dirtyFields.email,
					name: dirtyFields.name
				}
			});
		}

		const fields = parsed.data;

		const userAlreadyExistsWithEmail = await userExistsWithEmail({
			email: fields.email
		});

		if (userAlreadyExistsWithEmail) {
			return formValidationError<Response>({
				errors: emailAlreadyBeingUsedValidationError.format(),
				fields: {
					email: fields.email,
					name: fields.name
				}
			});
		}

		await createUser({
			email: fields.email,
			name: fields.name,
			password: fields.password
		});

		throw redirect(302, '/sign-in');
	}
};
