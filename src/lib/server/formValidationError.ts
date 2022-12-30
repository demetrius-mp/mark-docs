import { fail } from '@sveltejs/kit';

export default function formValidationError<T extends Record<string, unknown>>(data: T) {
	return fail(400, data);
}
