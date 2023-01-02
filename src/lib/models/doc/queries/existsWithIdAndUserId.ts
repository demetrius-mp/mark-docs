import db from '$lib/server/db';
import type { Doc } from '@prisma/client';

type DocExistsWithIdAndUserIdReq = {
	id: Doc['id'];
	userId: Doc['userId'];
};

export async function docExistsWithIdAndUserId(req: DocExistsWithIdAndUserIdReq) {
	const doc = await db.doc.findUnique({
		where: {
			id: req.id
		}
	});

	if (!doc || doc.userId !== req.userId) {
		return false;
	}

	return true;
}
