import { z } from 'zod';

export const createDocSchema = z.object({
	title: z.string().max(50),
	description: z.string().max(100)
});
