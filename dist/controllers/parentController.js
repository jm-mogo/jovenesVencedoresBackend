import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getAllParents = async () => {
    const parents = await prisma.parent.findMany();
    return parents;
};
const getParentById = async (parentId) => {
    try {
        const parent = await prisma.parent.findUnique({
            where: {
                id: parentId,
            },
        });
        return parent;
    }
    catch (err) {
        console.log(err);
    }
};
export { getAllParents, getParentById };
//# sourceMappingURL=parentController.js.map