import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllParents = async () => {
    return await prisma.parent.findMany();
};

const getParentById = async (parentId: number) => {
    try {
        return await prisma.parent.findUnique({
            where: {
                id: parentId,
            },
            include: {
                teens: true,
            },
        });
    } catch (err) {
        return err;
    }
};

const createParent = async (data: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}) => {
    try {
        return await prisma.parent.create({
            data,
        });
    } catch (err) {
        return err;
    }
};

const deleteParentById = async (parentId: number) => {
    try {
        return await prisma.parent.delete({
            where: {
                id: parentId,
            },
        });
    } catch (err) {
        return err;
    }
};

const updateParentById = async (
    parentId: number,
    data: { firstName: string; lastName: string; phoneNumber: string }
) => {
    try {
        return await prisma.parent.update({
            where: {
                id: parentId,
            },
            data,
        });
    } catch (err) {
        return err;
    }
};

export {
    getAllParents,
    getParentById,
    createParent,
    deleteParentById,
    updateParentById,
};
