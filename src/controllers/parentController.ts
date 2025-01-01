import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getAllParents = async () => {
    const parents = await prisma.parent.findMany();
    return parents;
};

const getParentById = async (parentId: number) => {
    try {
        const parent = await prisma.parent.findUnique({
            where: {
                id: parentId,
            },
            include: {
                teens: true,
            },
        });
        return parent;
    } catch (err) {
        console.log(err);
    }
};

const createParent = async (
    firstName: string,
    lastName: string,
    phoneNumber: string
) => {
    try {
        const parent = prisma.parent.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                phoneNumber: phoneNumber,
            },
        });
        return parent;
    } catch (err) {
        return err;
    }
};

const deleteParentById = async (parentId: number) => {
    try {
        const parentDeleted = await prisma.parent.delete({
            where: {
                id: parentId,
            },
        });
        return parentDeleted;
    } catch (err) {
        return err;
    }
};

export { getAllParents, getParentById, createParent, deleteParentById };
