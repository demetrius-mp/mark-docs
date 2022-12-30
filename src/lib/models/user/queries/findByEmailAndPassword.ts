import { verifyPassword } from '$lib/server/auth/password';
import db from '$lib/server/db';

type FindUserReq = {
	email: string;
	password: string;
};

export async function findUserByEmailAndPassword(req: FindUserReq) {
	const { email, password } = req;

	const user = await db.user.findUnique({
		where: {
			email: email
		}
	});

	if (!user) return null;

	const passwordIsCorrect = await verifyPassword(password, user.password);

	if (!passwordIsCorrect) {
		return null;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { password: _, ...userData } = user;

	return userData;
}
