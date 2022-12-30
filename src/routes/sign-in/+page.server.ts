import { findUserByEmailAndPassword } from '$lib/models/user/queries';
import { invalidCredentialsValidationError, signInSchema } from '$lib/models/user/schemas';
import { generateJwt } from '$lib/server/auth/jwt';
import formDataToJSON from '$lib/server/formDataToJSON';
import formValidationError from '$lib/server/formValidationError';
import { redirect } from '@sveltejs/kit';
import type { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

export const load = (({ locals }) => {
	if (locals.currentUser) throw redirect(302, '/app');
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		type Input = z.input<typeof signInSchema>;

		type Response = {
			errors: z.ZodFormattedError<Input>;
			fields: Omit<Input, 'password'>;
		};

		const dirtyFields = formDataToJSON(await request.formData()) as Input;
		const parsed = await signInSchema.spa(dirtyFields);

		if (!parsed.success) {
			return formValidationError<Response>({
				errors: parsed.error.format(),
				fields: {
					email: dirtyFields.email
				}
			});
		}

		const fields = parsed.data;

		const user = await findUserByEmailAndPassword(fields);

		if (!user) {
			return formValidationError<Response>({
				errors: invalidCredentialsValidationError.format(),
				fields: {
					email: fields.email
				}
			});
		}

		const jwt = generateJwt({
			userId: user.id
		});

		cookies.set('jwt', jwt, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 30
		});

		throw redirect(302, '/app');
	}
};
