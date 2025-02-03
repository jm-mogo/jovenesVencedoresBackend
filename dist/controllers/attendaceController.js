import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const createAttendance = async (data) => {
    data.present = true;
    try {
        const attendance = await prisma.attendance.create({ data });
        return attendance;
    }
    catch (err) {
        return err;
    }
};
const deleteAttendanceById = async (attendanceId) => {
    try {
        await prisma.attendance.delete({
            where: {
                id: attendanceId,
            },
        });
    }
    catch (err) {
        err;
    }
};
const updateAttendace = async (attendanceId, present) => {
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
    }
    catch (err) {
        return err;
    }
};
export { updateAttendace, createAttendance, deleteAttendanceById };
//# sourceMappingURL=attendaceController.js.map