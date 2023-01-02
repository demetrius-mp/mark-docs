import db from '$lib/server/db';
import type { Doc } from '@prisma/client';

type DeleteDocReq = {
	id: Doc['id'];
};

export async function deleteDoc(req: DeleteDocReq) {
	return await db.doc.delete({
		where: {
			id: req.id
		}
	});
}
