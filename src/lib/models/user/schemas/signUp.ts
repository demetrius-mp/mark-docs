import { z } from 'zod';

export const signUpSchema = z
	.object({
		email: z.string().email(),
		name: z.string(),
		password: z.string().min(8),
		confirmPassword: z.string().min(8)
	})
	.refine((data) => data.confirmPassword === data.password, {
		message: 'Passwords must match',
		path: ['confirmPassword']
	});

export const emailAlreadyBeingUsedValidationError = new z.ZodError([
	{
		code: 'custom',
		message: 'This email is already being used',
		path: ['email']
	}
]);
