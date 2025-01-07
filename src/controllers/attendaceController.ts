import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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

export { updateAttendace };
