import { Meeting, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createMeeting = async (meetingBody: Meeting) => {
	const meeting = await prisma.meeting.create({ data: meetingBody });

	await createPointRecordsInMeeting(meeting);

	return meeting;
};

const getMeeting = async (meetingId: number) => {
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

const getTeensInMeeting = async (meetingId: number) => {
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

const getTeensNotInMeeting = async (meetingId: number) => {
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

const getPointsInMeeting = async (meetingId: number) => {
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

const createPointRecordsInMeeting = async (meeting: Meeting) => {
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

const updateMeeting = async (meetingId: number, meetingBody: Meeting) => {
	const meeting = await prisma.meeting.update({
		where: {
			id: meetingId,
		},
		data: meetingBody,
	});
	return meeting;
};

const deleteMeeting = async (meetingId: number) => {
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
