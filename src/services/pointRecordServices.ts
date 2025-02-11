import { PointRecord, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const updatePointRecord = async (
	pointRecordId: number,
	pointRecordBody: PointRecord
) => {
	const pointRecordUpdated = await prisma.pointRecord.update({
		where: {
			id: pointRecordId,
		},
		data: pointRecordBody,
	});
	return pointRecordUpdated;
};

export const pointRecordServices = {
	updatePointRecord,
};
