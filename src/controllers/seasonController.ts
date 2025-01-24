import { PrismaClient } from "@prisma/client";
import teamMembership from "../routers/teamMembershipRouter.js";
const prisma = new PrismaClient();

const getAllSeasons = async () => {
	return await prisma.season.findMany();
};

const getSeasonById = async (seasonId: number) => {
	try {
		return await prisma.season.findUnique({
			where: {
				id: seasonId,
			},
			include: {
				teams: true,
				meetings: true,
			},
		});
	} catch (err) {
		return err;
	}
};
const getTeensWithoutTeamInSeason = async (id: number) => {
	try {
		const teens = await prisma.teen.findMany({
			where: {
				teamMemberships: {
					none: {
						seasonId: id,
					},
				},
			},
		});
		return teens;
	} catch (err) {
		return err;
	}
};

const getTeamsBySeasonId = async (id: number) => {
	try {
		const season = await prisma.season.findUnique({
			where: { id },
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
	} catch (err) {
		return err;
	}
};

const createSeason = async (name: string) => {
	try {
		return await prisma.season.create({
			data: {
				name: name,
			},
		});
	} catch (err) {
		return err;
	}
};

const deleteSeasonById = async (seasonId: number) => {
	try {
		return await prisma.season.delete({
			where: {
				id: seasonId,
			},
		});
	} catch (err) {
		return err;
	}
};

const updateSeasonById = async (seasonId: number, data: { name: string }) => {
	try {
		return await prisma.season.update({
			where: {
				id: seasonId,
			},
			data: data,
		});
	} catch (err) {
		return err;
	}
};

export {
	getAllSeasons,
	getSeasonById,
	createSeason,
	deleteSeasonById,
	updateSeasonById,
	getTeamsBySeasonId,
	getTeensWithoutTeamInSeason,
};
