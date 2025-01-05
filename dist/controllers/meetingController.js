import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getMeetingById = async (meetingId) => {
    try {
        return await prisma.meeting.findFirst({
            where: {
                id: meetingId,
            },
            include: {
                attendances: true,
                points: true,
            },
        });
    }
    catch (err) {
        return err;
    }
};
const createMeeting = async (data) => {
    try {
        return await prisma.meeting.create({ data });
    }
    catch (err) {
        return err;
    }
};
const deleteMeetingById = async (meetingId) => {
    try {
        return await prisma.meeting.delete({
            where: {
                id: meetingId,
            },
        });
    }
    catch (err) {
        return err;
    }
};
export { createMeeting, deleteMeetingById, getMeetingById };
//# sourceMappingURL=meetingController.js.map