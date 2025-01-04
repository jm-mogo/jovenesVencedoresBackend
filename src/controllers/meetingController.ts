import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createMeeting = async (data: { seasonId: number; date: Date }) => {
    try {
        return await prisma.meeting.create({ data });
    } catch (err) {
        return err;
    }
};

const deleteMeetingById = async (meetingId: number) => {
    try {
        return await prisma.meeting.delete({
            where: {
                id: meetingId,
            },
        });
    } catch (err) {
        return err;
    }
};

export { createMeeting, deleteMeetingById };
