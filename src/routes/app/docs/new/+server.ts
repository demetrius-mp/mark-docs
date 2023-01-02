import { createDoc } from '$lib/models/doc/mutations';
import { createDocSchema } from '$lib/models/doc/schemas';
import { error, json } from '@sveltejs/kit';
import type { z } from 'zod';
import type { RequestHandler } from './$types';

export const POST = (async ({ locals, request }) => {
	type Input = z.input<typeof createDocSchema>;

	if (!locals.currentUser) throw error(401, 'Unauthorized');

	const dirtyFields = (await request.json()) as Input;
	const parsed = await createDocSchema.spa(dirtyFields);

	console.log(parsed);

	if (!parsed.success) {
		return json(
			{
				errors: parsed.error.format()
			},
			{
				status: 422
			}
		);
	}

	const fields = parsed.data;

	const newDoc = await createDoc({
		description: fields.description,
		title: fields.title,
		userId: locals.currentUser.id
	});

	return json({
		data: newDoc
	});
}) satisfies RequestHandler;
