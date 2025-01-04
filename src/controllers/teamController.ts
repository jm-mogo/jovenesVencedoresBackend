import { PrismaClient, Team } from "@prisma/client";

const prisma = new PrismaClient();

const getAllTeams = async () => {
    return await prisma.team.findMany();
};

const getTeamById = async (id: number) => {
    try {
        return await prisma.team.findUnique({
            where: { id },
        });
    } catch (err) {
        return err;
    }
};

const createTeam = async (data: { name: string; seasonId: number }) => {
    try {
        return await prisma.team.create({
            data,
        });
    } catch (err) {
        return err;
    }
};

const updateTeamById = async (teamId: number, data: { name: string }) => {
    try {
        return await prisma.team.update({
            where: { id: teamId },
            data,
        });
    } catch (err) {
        return err;
    }
};

const deleteTeamById = async (id: number) => {
    try {
        return await prisma.team.delete({
            where: { id },
        });
    } catch (err) {
        return err;
    }
};

export { getAllTeams, getTeamById, createTeam, updateTeamById, deleteTeamById };
