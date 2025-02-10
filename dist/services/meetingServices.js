import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const createMeeting = async (meetingBody) => {
    const meeting = await prisma.meeting.create({ data: meetingBody });
    await createPointRecordsInMeeting(meeting);
    return meeting;
};
const getMeeting = async (meetingId) => {
    const meeting = await prisma.meeting.findFirst({
        where: {
            id: meetingId,
        },
        include: {
            attendances: true,
            points: true,
        },
    });
    return meeting;
};
const getTeensInMeeting = async (meetingId) => {
    const meeting = await prisma.meeting.findFirst({
        where: { id: meetingId },
        include: {
            attendances: {
                include: {
                    teamMembership: {
                        include: {
                            teen: {
                                select: {
                                    firstName: true,
                                    lastName: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
    return meeting?.attendances;
};
const getTeensNotInMeeting = async (meetingId) => {
    const meating = await prisma.meeting.findFirst({
        where: { id: meetingId },
    });
    const teamMemberships = await prisma.teamMembership.findMany({
        where: {
            seasonId: meating?.seasonId,
            attendances: {
                none: {
                    meetingId: meetingId,
                },
            },
        },
        include: {
            teen: {
                select: {
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });
    return teamMemberships;
};
const getPointsInMeeting = async (meetingId) => {
    const pointRecords = await prisma.pointRecord.findMany({
        where: {
            meetingId: meetingId,
        },
        include: {
            team: true,
        },
    });
    return pointRecords;
};
const createPointRecordsInMeeting = async (meeting) => {
    const season = await prisma.season.findFirst({
        where: { id: meeting.seasonId },
    });
    const teams = await prisma.team.findMany({
        where: {
            seasonId: season?.id,
        },
    });
    teams.map(async (team) => {
        await prisma.pointRecord.create({
            data: {
                meetingId: meeting.id,
                teamId: team.id,
                points: 0,
            },
        });
    });
};
const updateMeeting = async (meetingId, meetingBody) => {
    const meeting = await prisma.meeting.update({
        where: {
            id: meetingId,
        },
        data: meetingBody,
    });
    return meeting;
};
const deleteMeeting = async (meetingId) => {
    const meetingDeleted = await prisma.meeting.delete({
        where: {
            id: meetingId,
        },
    });
    return meetingDeleted;
};
export const meetingServices = {
    createMeeting,
    getMeeting,
    getTeensInMeeting,
    getTeensNotInMeeting,
    getPointsInMeeting,
    updateMeeting,
    deleteMeeting,
};
//# sourceMappingURL=meetingServices.js.map