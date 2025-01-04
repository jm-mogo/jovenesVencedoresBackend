import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const createMeating = async (data) => {
    try {
        return await prisma.meeting.create({ data });
    }
    catch (err) {
        return err;
    }
};
const deleteMeatingById = async (meatingId) => {
    try {
        return await prisma.meeting.delete({
            where: {
                id: meatingId,
            },
        });
    }
    catch (err) {
        return err;
    }
};
export { createMeating, deleteMeatingById };
//# sourceMappingURL=meatingController.js.map