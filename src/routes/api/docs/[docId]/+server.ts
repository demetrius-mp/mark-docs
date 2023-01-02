import { deleteDoc, updateDoc } from '$lib/models/doc/mutations';
import { docExistsWithIdAndUserId, getDocByIdOrUUID } from '$lib/models/doc/queries';
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

	const doc = await getDocByIdOrUUID({
		id: docId,
		uuid: params.docId
	});

	if (!doc) {
		throw error(401, 'Unauthorized');
	}

	if (
		doc.userId !== locals.currentUser.id &&
		(doc.visibility === 'PRIVATE' || doc.sharePrivileges !== 'EDITOR')
	) {
		throw error(401, 'Unauthorized');
	}

	const updatedDoc = await updateDoc({
		description: fields.description,
		title: fields.title,
		content: fields.content,
		id: docId
	});

	return json({
		data: updatedDoc
	});
}) satisfies RequestHandler;

export const DELETE = (async ({ locals, params }) => {
	if (!locals.currentUser) throw error(401, 'Unauthorized');

	const docId = parseInt(params.docId, 10);

	const docExists = await docExistsWithIdAndUserId({
		id: docId,
		userId: locals.currentUser.id
	});

	if (!docExists) {
		throw error(401, 'Unauthorized');
	}

	await deleteDoc({
		id: docId
	});

	return new Response(null, {
		status: 200
	});
}) satisfies RequestHandler;
