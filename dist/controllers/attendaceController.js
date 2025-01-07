import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
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
export { updateAttendace };
//# sourceMappingURL=attendaceController.js.map