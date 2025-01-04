import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createTeamMembership = async (data: {
    teenId: number;
    teamId: number;
    seasonId: number;
}) => {
    try {
        return await prisma.teamMembership.create({ data });
    } catch (err) {
        return err;
    }
};

const deleteTeamMembershipById = async (teamMembershipId: number) => {
    try {
        await prisma.teamMembership.delete({
            where: {
                id: teamMembershipId,
            },
        });
    } catch (err) {
        err;
    }
};

export { createTeamMembership, deleteTeamMembershipById };
