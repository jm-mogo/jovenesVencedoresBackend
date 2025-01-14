import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getAllSeasons = async () => {
    return await prisma.season.findMany();
};
const getSeasonById = async (seasonId) => {
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
    }
    catch (err) {
        return err;
    }
};
const getTeamsBySeasonId = async (id) => {
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
    }
    catch (err) {
        return err;
    }
};
const createSeason = async (name) => {
    try {
        return await prisma.season.create({
            data: {
                name: name,
            },
        });
    }
    catch (err) {
        return err;
    }
};
const deleteSeasonById = async (seasonId) => {
    try {
        return await prisma.season.delete({
            where: {
                id: seasonId,
            },
        });
    }
    catch (err) {
        return err;
    }
};
const updateSeasonById = async (seasonId, data) => {
    try {
        return await prisma.season.update({
            where: {
                id: seasonId,
            },
            data: data,
        });
    }
    catch (err) {
        return err;
    }
};
export { getAllSeasons, getSeasonById, createSeason, deleteSeasonById, updateSeasonById, getTeamsBySeasonId, };
//# sourceMappingURL=seasonController.js.map