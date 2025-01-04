import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const createTeamMembership = async (data) => {
    try {
        return await prisma.teamMembership.create({ data });
    }
    catch (err) {
        return err;
    }
};
const deleteTeamMembershipById = async (teamMembershipId) => {
    try {
        await prisma.teamMembership.delete({
            where: {
                id: teamMembershipId,
            },
        });
    }
    catch (err) {
        err;
    }
};
export { createTeamMembership, deleteTeamMembershipById };
//# sourceMappingURL=teamMembershipController.js.map