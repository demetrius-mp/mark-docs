import { JWT_SECRET_KEY, JWT_EXPIRES_IN, JWT_ALGORITHM } from '$env/static/private';
import db from '$lib/server/db';
import type { User } from '@prisma/client';
import jwt, { type Algorithm, type VerifyOptions } from 'jsonwebtoken';

const SECRET_KEY = JWT_SECRET_KEY;
const EXPIRES_IN = JWT_EXPIRES_IN || '1d';
const ALGORITHM = (JWT_ALGORITHM || 'HS256') as Algorithm;

type JwtPayloadType = {
	userId: User['id'];
};

export function generateJwt(payload: JwtPayloadType): string {
	const token = jwt.sign(payload, SECRET_KEY, {
		algorithm: ALGORITHM,
		expiresIn: EXPIRES_IN
	});

	return token;
}

function verifyJwt(token: string, options?: VerifyOptions): JwtPayloadType {
	const payload = jwt.verify(token, SECRET_KEY, options) as JwtPayloadType;

	return payload;
}

export default async function getUserFromJwt(jwt?: string) {
	if (!jwt) {
		return undefined;
	}

	try {
		const { userId } = verifyJwt(jwt);

		const user = await db.user.findUnique({
			where: {
				id: userId
			},
			select: db.$exclude('user', ['password'])
		});

		if (!user) return undefined;

		return user;
	} catch (e) {
		return undefined;
	}
}
