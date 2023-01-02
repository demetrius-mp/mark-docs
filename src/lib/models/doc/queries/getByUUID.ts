import db from '$lib/server/db';

type GetDocByUUIDReq = {
	uuid: string;
};

export async function getDocByUUID(req: GetDocByUUIDReq) {
	return await db.doc.findUnique({
		where: {
			uuid: req.uuid
		}
	});
}
