import { PrismaClient, Team } from "@prisma/client";
import { getTeenById } from "./teenController.js";
import teamMembership from "../routers/teamMembershipRouter.js";

const prisma = new PrismaClient();

const getAllTeams = async () => {
	return await prisma.team.findMany();
};

const getTeamById = async (id: number) => {
	try {
		return await prisma.team.findUnique({
			where: { id },
			include: {
				points: true,
			},
		});
	} catch (err) {
		return err;
	}
};

const getTeamMembersById = async (id: number) => {
	try {
		const team = await prisma.team.findUnique({
			where: { id },
			include: {
				teamMemberships: true,
			},
		});

		const teensId = team?.teamMemberships.map(
			(teamMembership) => teamMembership.id
		);

		const members = await prisma.teen.findMany({
			where: {
				id: { in: teensId },
			},

			select: {
				id: true,
				firstName: true,
				lastName: true,
			},
		});

		return members;
	} catch (err) {
		return err;
	}
};

const createTeam = async (data: { name: string; seasonId: number }) => {
	try {
		return await prisma.team.create({
			data,
		});
	} catch (err) {
		return err;
	}
};

const updateTeamById = async (teamId: number, data: { name: string }) => {
	try {
		return await prisma.team.update({
			where: { id: teamId },
			data,
		});
	} catch (err) {
		return err;
	}
};

const deleteTeamById = async (id: number) => {
	try {
		return await prisma.team.delete({
			where: { id },
		});
	} catch (err) {
		return err;
	}
};

export {
	getAllTeams,
	getTeamById,
	createTeam,
	updateTeamById,
	deleteTeamById,
	getTeamMembersById,
};
