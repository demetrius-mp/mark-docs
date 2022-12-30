import { generatePasswordHash } from '$lib/server/auth/password';
import db from '$lib/server/db';
import { createHash } from 'node:crypto';

function getMd5Hash(content: string) {
	return createHash('md5').update(content).digest('hex');
}

function getGravatarImage(email: string) {
	const hash = getMd5Hash(email);

	return `https://www.gravatar.com/avatar/${hash}?d=mp`;
}

type CreateUserReq = {
	email: string;
	name: string;
	password: string;
};

export async function createUser(req: CreateUserReq) {
	const gravatarImage = getGravatarImage(req.email);

	return await db.user.create({
		data: {
			email: req.email,
			name: req.name,
			password: await generatePasswordHash(req.password),
			profilePictureUrl: gravatarImage
		}
	});
}
