import db from '$lib/server/db';
import type { Doc } from '@prisma/client';

type UpdateDocReq = {
	id: Doc['id'];
	title?: Doc['title'];
	description?: Doc['description'];
	content?: Doc['content'];
};

export async function updateDoc(req: UpdateDocReq) {
	return await db.doc.update({
		where: {
			id: req.id
		},
		data: {
			content: req.content,
			title: req.title,
			description: req.description
		}
	});
}
