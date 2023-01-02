import db from '$lib/server/db';
import type { User } from '@prisma/client';

type GetAllDocsByUserIdReq = {
	userId: User['id'];
};

export async function getAllDocsByUserId(req: GetAllDocsByUserIdReq) {
	return await db.doc.findMany({
		where: {
			userId: req.userId
		},
		orderBy: {
			title: 'asc'
		}
	});
}
