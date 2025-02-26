import { PrismaClient, Season } from "@prisma/client";
const prisma = new PrismaClient();

const createSeason = async (seasonBody: Season) => {
	const season = await prisma.season.create({
		data: seasonBody,
	});

	return season;
};

const getSeasons = async (groupId: number) => {
	const seasons = await prisma.season.findMany({
		where: {
			groupId: groupId,
		},
	});
	return seasons;
};

const getSeason = async (seasonId: number) => {
	const season = await prisma.season.findUnique({
		where: {
			id: seasonId,
		},
		include: {
			teams: true,
			meetings: {
				orderBy: {
					date: "desc",
				},
				include: {
					attendances: true,
				},
			},
		},
	});
	return season;
};

const getTeamsInSeason = async (seasonId: number) => {
	const season = await prisma.season.findUnique({
		where: { id: seasonId },
		include: {
			teams: true,
		},
	});
	const teamsId = season?.teams.map((team) => team.id);
	const teams = await prisma.team.findMany({
		where: {
			id: { in: teamsId },
		},
		include: {
			points: true,
			teamMemberships: true,
		},
	});
	return teams;
};

const getTeensNotInSeason = async (seasonId: number, groupId: number) => {
	const teens = await prisma.teen.findMany({
		where: {
			groupId: groupId,
			teamMemberships: {
				none: {
					seasonId: seasonId,
				},
			},
		},
	});
	return teens;
};

const updateSeason = async (seasonId: number, seasonBody: Season) => {
	const seasonUpdated = await prisma.season.update({
		where: {
			id: seasonId,
		},
		data: seasonBody,
	});
	return seasonUpdated;
};

const deleteSeason = async (seasonId: number) => {
	const seasonDeleted = await prisma.season.delete({
		where: {
			id: seasonId,
		},
	});
	return seasonDeleted;
};

export const seasonServices = {
	createSeason,
	getSeasons,
	getSeason,
	getTeamsInSeason,
	getTeensNotInSeason,
	updateSeason,
	deleteSeason,
};
