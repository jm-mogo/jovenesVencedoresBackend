import { PrismaClient, Team } from "@prisma/client";
const prisma = new PrismaClient();

const createTeam = async (teamBody: Team) => {
	const team = await prisma.team.create({
		data: teamBody,
	});

	return team;
};

const getTeams = async (seasonId: number) => {
	const teams = prisma.team.findMany({
		where: {
			seasonId: seasonId,
		},
	});
	return teams;
};

const getTeam = async (teamId: number) => {
	const team = await prisma.team.findUnique({
		where: { id: teamId },
		include: {
			points: true,
		},
	});
	return team;
};

const getMembers = async (teamId: number) => {
	const team = await prisma.team.findUnique({
		where: { id: teamId },
		include: {
			teamMemberships: {
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
	});

	return team?.teamMemberships;
};
const updateTeam = async (teamId: number, teamBody: Team) => {
	const teamUpdated = await prisma.team.update({
		where: { id: teamId },
		data: teamBody,
	});

	return teamUpdated;
};

const deleteTeam = async (teamId: number) => {
	const teamDeleted = await prisma.team.delete({
		where: { id: teamId },
	});

	return teamDeleted;
};

export const teamServices = {
	createTeam,
	getTeams,
	getTeam,
	getMembers,
	updateTeam,
	deleteTeam,
};
