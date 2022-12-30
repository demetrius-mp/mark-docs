import bcrypt from 'bcryptjs';

const HASH_ROUNDS = 10;

export async function generatePasswordHash(password: string): Promise<string> {
	const hashedPassword = await bcrypt.hash(password, HASH_ROUNDS);

	return hashedPassword;
}

export async function verifyPassword(
	plainPassword: string,
	hashedPassword: string
): Promise<boolean> {
	const isCorrect = bcrypt.compare(plainPassword, hashedPassword);

	return isCorrect;
}
