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
        const meeting = await prisma.meeting.create({ data });
        const members = await prisma.teamMembership.findMany({
            where: { seasonId: meeting.seasonId },
        });
        const membersId = members.map((member) => {
            return {
                meetingId: meeting.id,
                teamMembershipId: member.id,
                present: false,
            };
        });
        await prisma.attendance.createManyAndReturn({
            data: membersId,
        });
        return meeting;
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