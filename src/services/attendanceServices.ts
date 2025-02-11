import { Attendance, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createAttendance = async (attendanceBody: Attendance) => {
	const attendance = await prisma.attendance.create({
		data: attendanceBody,
	});

	return attendance;
};

const deleteAttendance = async (attendanceId: number) => {
	try {
		await prisma.attendance.delete({
			where: {
				id: attendanceId,
			},
		});
	} catch (err) {
		err;
	}
};

export const attendanceServices = {
	createAttendance,
	deleteAttendance,
};
