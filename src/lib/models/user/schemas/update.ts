import { z } from 'zod';

const optionalStringWithMinLength8 = z
	.union([z.string().length(0, 'String must contain at least 8 character(s)'), z.string().min(8)])
	.optional()
	.transform((e) => (e === '' ? undefined : e));

export const updateUserSchema = z
	.object({
		name: z.string(),
		email: z.string().email(),
		newPassword: optionalStringWithMinLength8,
		confirmNewPassword: optionalStringWithMinLength8,
		currentPassword: z.string().min(8)
	})
	.refine((data) => data.newPassword === data.confirmNewPassword, {
		message: 'Passwords must match',
		path: ['confirmNewPassword']
	});

export const wrongPasswordValidationError = new z.ZodError([
	{
		code: 'custom',
		message: 'Wrong passsword',
		path: ['currentPassword']
	}
]);
