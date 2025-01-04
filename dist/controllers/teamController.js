import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const getAllTeams = async () => {
    return await prisma.team.findMany();
};
const getTeamById = async (id) => {
    try {
        return await prisma.team.findUnique({
            where: { id },
        });
    }
    catch (err) {
        return err;
    }
};
const createTeam = async (data) => {
    try {
        return await prisma.team.create({
            data,
        });
    }
    catch (err) {
        return err;
    }
};
const updateTeamById = async (teamId, data) => {
    try {
        return await prisma.team.update({
            where: { id: teamId },
            data,
        });
    }
    catch (err) {
        return err;
    }
};
const deleteTeamById = async (id) => {
    try {
        return await prisma.team.delete({
            where: { id },
        });
    }
    catch (err) {
        return err;
    }
};
export { getAllTeams, getTeamById, createTeam, updateTeamById, deleteTeamById };
//# sourceMappingURL=teamController.js.map