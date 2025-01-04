import { PrismaClient } from "@prisma/client";
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
            },
        });
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
};
