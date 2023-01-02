import db from '$lib/server/db';
import type { User } from '@prisma/client';

type EmailIsBeingUsedReq = {
	email: User['email'];
};

export async function emailIsBeingUsed(req: EmailIsBeingUsedReq): Promise<boolean> {
	const user = await db.user.findUnique({
		where: {
			email: req.email
		},
		select: {
			id: true
		}
	});

	return user !== null;
}
