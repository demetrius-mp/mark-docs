import { z } from 'zod';
import { createDocSchema } from './create';

export const updateDocSchema = createDocSchema.partial().extend({
	content: z.string().optional()
});
