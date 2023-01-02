import db from '$lib/server/db';

type CreateDocReq = {
	content?: string;
	description: string;
	title: string;
	userId: number;
};

export async function createDoc(req: CreateDocReq) {
	return await db.doc.create({
		data: {
			content: req.content || '',
			description: req.description,
			title: req.title,
			userId: req.userId
		}
	});
}
