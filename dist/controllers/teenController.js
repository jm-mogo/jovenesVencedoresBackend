import { PrismaClient } from "@prisma/client";
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
const getTeenById = async (teenId) => {
    try {
        return await prisma.teen.findUnique({
            where: {
                id: teenId,
            },
        });
    }
    catch (err) {
        return err;
    }
};
const createTeen = async (data) => {
    try {
        return await prisma.teen.create({
            data,
        });
    }
    catch (err) {
        return err;
    }
};
const updateTeenById = async (teenId, data) => {
    try {
        return await prisma.teen.update({
            where: {
                id: teenId,
            },
            data,
        });
    }
    catch (err) {
        return err;
    }
};
const deleteTeenById = async (teenId) => {
    try {
        return await prisma.teen.delete({
            where: {
                id: teenId,
            },
        });
    }
    catch (err) {
        return err;
    }
};
export { getAllTeens, getTeenById, createTeen, deleteTeenById, updateTeenById };
//# sourceMappingURL=teenController.js.map