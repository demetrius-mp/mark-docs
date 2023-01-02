import { DocVisibility, SharedDocPrivileges } from '@prisma/client';
import { z } from 'zod';

export const setVisibilitySchema = z.object({
	visibility: z.nativeEnum(DocVisibility),
	privileges: z.nativeEnum(SharedDocPrivileges)
});
