import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createAttendance = async (data: {
	meetingId: number;
	teamMembershipId: number;
	present: boolean;
}) => {
	data.present = true;
	try {
		const attendance = await prisma.attendance.create({ data });

		return attendance;
	} catch (err) {
		return err;
	}
};

const updateAttendace = async (attendanceId: number, present: boolean) => {
	try {
		const updatedAttendace = await prisma.attendance.updateMany({
			where: {
				id: attendanceId,
			},
			data: {
				present,
			},
		});
		return updatedAttendace;
	} catch (err) {
		return err;
	}
};

export { updateAttendace, createAttendance };
