import { updateUser } from '$lib/models/user/mutations';
import { emailIsBeingUsed, findUserByEmailAndPassword } from '$lib/models/user/queries';
import {
	emailAlreadyBeingUsedValidationError,
	updateUserSchema,
	wrongPasswordValidationError
} from '$lib/models/user/schemas';
import formDataToJSON from '$lib/server/formDataToJSON';
import formValidationError from '$lib/server/formValidationError';
import { redirect } from '@sveltejs/kit';
import type { z } from 'zod';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		type Input = z.input<typeof updateUserSchema>;
		type Response = {
			errors: z.ZodFormattedError<Input>;
			fields: Pick<Input, 'email' | 'name'>;
		};

		if (!locals.currentUser) throw redirect(302, '/app/sign-in');

		const dirtyFields = formDataToJSON(await request.formData()) as Input;

		const parsed = await updateUserSchema.spa(dirtyFields);

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

		const currentUser = await findUserByEmailAndPassword({
			email: locals.currentUser.email,
			password: fields.currentPassword
		});

		if (!currentUser) {
			return formValidationError<Response>({
				errors: wrongPasswordValidationError.format(),
				fields: {
					email: fields.email,
					name: fields.name
				}
			});
		}

		if (fields.email !== currentUser.email && (await emailIsBeingUsed({ email: fields.email }))) {
			return formValidationError<Response>({
				fields,
				errors: emailAlreadyBeingUsedValidationError.format()
			});
		}

		await updateUser({
			email: fields.email,
			name: fields.name,
			password: fields.newPassword
		});

		throw redirect(302, '/app/docs');
	}
};
