import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const createTeen = async (teenBody) => {
    const teen = await prisma.teen.create({
        data: teenBody,
    });
    return teen;
};
const getTeens = async (groupId) => {
    const teens = await prisma.teen.findMany({
        where: {
            groupId: groupId,
        },
    });
    return teens;
};
const getTeen = async (teenId) => {
    const teen = await prisma.teen.findUnique({
        where: {
            id: teenId,
        },
        include: {
            parent: true,
        },
    });
    return teen;
};
const updateTeen = async (teenId, teenBody) => {
    const teen = await prisma.teen.update({
        where: {
            id: teenId,
        },
        data: teenBody,
    });
    return teen;
};
const deleteTeen = async (teenId) => {
    const teen = await prisma.teen.delete({
        where: {
            id: teenId,
        },
    });
    return teen;
};
const canAccessTeen = async (userAuth, teenId) => {
    const teen = await getTeen(teenId);
    if (!userAuth.groupId || !teen) {
        return false;
    }
    if (userAuth.groupId !== teen.groupId) {
        return false;
    }
    return true;
};
export const teenServices = {
    createTeen,
    getTeens,
    getTeen,
    updateTeen,
    deleteTeen,
    canAccessTeen,
};
//# sourceMappingURL=teenServices.js.map