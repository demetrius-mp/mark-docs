import { setDocVisibility } from '$lib/models/doc/mutations';
import { docExistsWithIdAndUserId } from '$lib/models/doc/queries';
import { setVisibilitySchema } from '$lib/models/doc/schemas';
import { error, json } from '@sveltejs/kit';
import type { z } from 'zod';
import type { RequestHandler } from './$types';

export const POST = (async ({ request, locals, params }) => {
	type Input = z.input<typeof setVisibilitySchema>;

	if (!locals.currentUser) {
		throw error(401, 'Unauthorized');
	}

	const docId = parseInt(params.docId);

	const dirtyFields = (await request.json()) as Input;

	const parsed = await setVisibilitySchema.spa(dirtyFields);

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

	const docExists = await docExistsWithIdAndUserId({
		id: docId,
		userId: locals.currentUser.id
	});

	if (!docExists) {
		throw error(404, 'Document not found');
	}

	await setDocVisibility({
		id: docId,
		sharePrivileges: fields.privileges,
		visibility: fields.visibility
	});

	return new Response(null, {
		status: 200
	});
}) satisfies RequestHandler;
