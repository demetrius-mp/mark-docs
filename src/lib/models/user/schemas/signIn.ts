import { z } from 'zod';

export const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8)
});

export const invalidCredentialsValidationError = new z.ZodError([
	{
		code: 'custom',
		message: 'Invalid credentials',
		path: []
	}
]);
