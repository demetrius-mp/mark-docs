import { updateDoc } from '$lib/models/doc/mutations';
import { updateDocSchema } from '$lib/models/doc/schemas';
import { error, json } from '@sveltejs/kit';
import type { z } from 'zod';
import type { RequestHandler } from './$types';

export const POST = (async ({ locals, request, params }) => {
	type Input = z.input<typeof updateDocSchema>;

	if (!locals.currentUser) throw error(401, 'Unauthorized');

	const docId = parseInt(params.docId, 10);

	const dirtyFields = (await request.json()) as Input;
	const parsed = await updateDocSchema.spa(dirtyFields);

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

	const udpatedDoc = await updateDoc({
		description: fields.description,
		title: fields.title,
		content: fields.content,
		id: docId
	});

	return json({
		data: udpatedDoc
	});
}) satisfies RequestHandler;
