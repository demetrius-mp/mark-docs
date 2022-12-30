import db from '$lib/server/db';

type UserExistsWithEmailReq = {
	email: string;
};

export async function userExistsWithEmail(req: UserExistsWithEmailReq) {
	const existingUser = await db.user.findUnique({
		where: {
			email: req.email
		},
		select: {
			id: true
		}
	});

	return existingUser !== null;
}
