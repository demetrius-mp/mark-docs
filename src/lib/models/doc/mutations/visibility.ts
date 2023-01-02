import db from '$lib/server/db';
import type { DocVisibility, SharedDocPrivileges } from '@prisma/client';

type SetDocVisibilityReq = {
	id: number;
	sharePrivileges: SharedDocPrivileges;
	visibility: DocVisibility;
};

export async function setDocVisibility(req: SetDocVisibilityReq) {
	return await db.doc.update({
		where: {
			id: req.id
		},
		data: {
			sharePrivileges: req.sharePrivileges,
			visibility: req.visibility
		}
	});
}
