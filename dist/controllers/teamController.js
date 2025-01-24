import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getAllTeams = async () => {
    return await prisma.team.findMany();
};
const getTeamById = async (id) => {
    try {
        return await prisma.team.findUnique({
            where: { id },
            include: {
                points: true,
            },
        });
    }
    catch (err) {
        return err;
    }
};
const getTeamMembersById = async (id) => {
    try {
        const team = await prisma.team.findUnique({
            where: { id: id },
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
        // const teensId = team?.teamMemberships.map(
        // 	(teamMembership) => teamMembership.teenId
        // );
        // const members = await prisma.teen.findMany({
        // 	where: {
        // 		id: { in: teensId },
        // 	},
        // 	select: {
        // 		id: true,
        // 		firstName: true,
        // 		lastName: true,
        // 	},
        // });
        return team?.teamMemberships;
    }
    catch (err) {
        return err;
    }
};
const createTeam = async (data) => {
    try {
        return await prisma.team.create({
            data,
        });
    }
    catch (err) {
        return err;
    }
};
const updateTeamById = async (teamId, data) => {
    try {
        return await prisma.team.update({
            where: { id: teamId },
            data,
        });
    }
    catch (err) {
        return err;
    }
};
const deleteTeamById = async (id) => {
    try {
        return await prisma.team.delete({
            where: { id },
        });
    }
    catch (err) {
        return err;
    }
};
export { getAllTeams, getTeamById, createTeam, updateTeamById, deleteTeamById, getTeamMembersById, };
//# sourceMappingURL=teamController.js.map