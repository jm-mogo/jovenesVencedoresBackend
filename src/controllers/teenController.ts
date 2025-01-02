import { Gender, PrismaClient, Teen } from "@prisma/client";

const prisma = new PrismaClient();

const getAllTeens = async () => {
    const teens = await prisma.teen.findMany({
        select: {
            firstName: true,
            lastName: true,
            id: true,
        },
    });
    return teens;
};

const getTeenById = async (teenId: number) => {
    try {
        const teen = await prisma.teen.findUnique({
            where: {
                id: teenId,
            },
        });
        return teen;
    } catch (err) {
        console.log(err);
    }
};

const createTeen = async (data: Teen) => {
    try {
        const teen = await prisma.teen.create({
            data,
        });
        return teen;
    } catch (err) {
        return err;
    }
};

const deleteTeenById = async (teenId: number) => {
    try {
        const teenDeleted = await prisma.teen.delete({
            where: {
                id: teenId,
            },
        });
        return teenDeleted;
    } catch (err) {
        return err;
    }
};

const updateTeenById = async (data: object, teenId: number) => {
    try {
        const teenUpdated = await prisma.teen.update({
            where: {
                id: teenId,
            },
            data,
        });
        return teenUpdated;
    } catch (err) {
        return err;
    }
};

export { getAllTeens, getTeenById, createTeen, deleteTeenById, updateTeenById };
