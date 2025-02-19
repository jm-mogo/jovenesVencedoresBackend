import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const createTeamMembership = async (teamMembershipBody) => {
    const teamMembership = await prisma.teamMembership.create({
        data: teamMembershipBody,
    });
    return teamMembership;
};
const updateTeamMembership = async (teamMembershipId, teamMembershipBody) => {
    const teamMembership = await prisma.teamMembership.update({
        where: {
            id: teamMembershipId,
        },
        data: teamMembershipBody,
    });
    return teamMembership;
};
const deleteTeamMembershipById = async (teamMembershipId) => {
    await prisma.attendance.deleteMany({ where: { teamMembershipId } });
    await prisma.teamMembership.delete({
        where: {
            id: teamMembershipId,
        },
    });
};
export const teamMembershipServices = {
    createTeamMembership,
    deleteTeamMembershipById,
    updateTeamMembership,
};
//# sourceMappingURL=teamMembershipServices.js.map