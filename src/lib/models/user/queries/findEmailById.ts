import db from '$lib/server/db';
import type { User } from '@prisma/client';

type FindUserEmailByIdReq = {
	id: User['id'];
};

export async function findUserEmailById(req: FindUserEmailByIdReq) {
	return await db.user.findUnique({
		where: {
			id: req.id
		},
		select: {
			email: true
		}
	});
}
