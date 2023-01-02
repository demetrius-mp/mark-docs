import db from '$lib/server/db';

type GetByIdOrUUIDReq = {
	id: number;
	uuid: string;
};

export async function getDocByIdOrUUID(req: GetByIdOrUUIDReq) {
	return await db.doc.findFirst({
		where: {
			OR: [
				{
					id: req.id
				},
				{
					uuid: req.uuid
				}
			]
		}
	});
}
