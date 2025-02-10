import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const createSeason = async (seasonBody) => {
    const season = await prisma.season.create({
        data: seasonBody,
    });
    return season;
};
const getSeasons = async (groupId) => {
    const seasons = await prisma.season.findMany({
        where: {
            groupId: groupId,
        },
    });
    return seasons;
};
const getSeason = async (seasonId) => {
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
const getTeamsInSeason = async (seasonId) => {
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
const getTeensNotInSeason = async (seasonId) => {
    const teens = await prisma.teen.findMany({
        where: {
            teamMemberships: {
                none: {
                    seasonId: seasonId,
                },
            },
        },
    });
    return teens;
};
const updateSeason = async (seasonId, seasonBody) => {
    const seasonUpdated = await prisma.season.update({
        where: {
            id: seasonId,
        },
        data: seasonBody,
    });
    return seasonUpdated;
};
const deleteSeason = async (seasonId) => {
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
//# sourceMappingURL=seasonServices.js.map