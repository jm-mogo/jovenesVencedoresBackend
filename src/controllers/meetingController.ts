import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getMeetingById = async (meetingId: number) => {
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
	} catch (err) {
		return err;
	}
};

const getTeensInMeeting = async (id: number) => {
	try {
		const meeting = await prisma.meeting.findFirst({
			where: { id: id },
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
	} catch (err) {
		return err;
	}
};

const getTeensNotInMeeting = async (id: number) => {
	try {
		const meating = await prisma.meeting.findFirst({ where: { id: id } });

		const teamMemberships = await prisma.teamMembership.findMany({
			where: {
				seasonId: meating?.seasonId,
				attendances: {
					none: {
						meetingId: id,
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
	} catch (err) {
		return err;
	}
};

const getPointsInMeeting = async (meetingId: number) => {
	try {
		const pointRecords = prisma.pointRecord.findMany({
			where: {
				meetingId: meetingId,
			},
			include: {
				team: true,
			},
		});
		return pointRecords;
	} catch (err) {
		return err;
	}
};
const createMeeting = async (data: { seasonId: number; date: Date }) => {
	try {
		const meeting = await prisma.meeting.create({ data });

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

		return meeting;
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

export {
	createMeeting,
	deleteMeetingById,
	getMeetingById,
	getTeensInMeeting,
	getTeensNotInMeeting,
	getPointsInMeeting,
};
