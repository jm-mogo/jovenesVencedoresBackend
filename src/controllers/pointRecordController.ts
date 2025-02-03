import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createPointRecord = async (data: {
	teamId: number;
	meetingId: number;
	points: number;
}) => {
	try {
		return await prisma.pointRecord.create({
			data,
		});
	} catch (err) {
		return err;
	}
};

const updatePointRecord = async (
	pointRecordId: number,
	data: { points: number }
) => {
	try {
		return await prisma.pointRecord.update({
			where: {
				id: pointRecordId,
			},
			data,
		});
	} catch (err) {
		return err;
	}
};

const deletePointRecordById = async (pointRecordId: number) => {
	try {
		return await prisma.pointRecord.delete({
			where: { id: pointRecordId },
		});
	} catch (err) {
		err;
	}
};

export { createPointRecord, updatePointRecord, deletePointRecordById };
