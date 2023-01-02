import { generatePasswordHash } from '$lib/server/auth/password';
import db from '$lib/server/db';
import type { User } from '@prisma/client';

type UpdateUserReq = {
	email?: User['email'];
	name?: User['name'];
	password?: User['password'];
};

export async function updateUser(req: UpdateUserReq) {
	const password = req.password ? await generatePasswordHash(req.password) : undefined;

	return await db.user.update({
		where: {
			email: req.email
		},
		data: {
			email: req.email,
			name: req.name,
			password
		}
	});
}
