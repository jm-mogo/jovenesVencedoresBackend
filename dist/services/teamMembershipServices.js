import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const createTeamMembership = async (teamMembershipBody) => {
    const teamMembership = await prisma.teamMembership.create({
        data: teamMembershipBody,
    });
    return teamMembership;
};
const deleteTeamMembershipById = async (teamMembershipId) => {
    await prisma.teamMembership.delete({
        where: {
            id: teamMembershipId,
        },
    });
};
export const teamMembershipServices = {
    createTeamMembership,
    deleteTeamMembershipById,
};
//# sourceMappingURL=teamMembershipServices.js.map