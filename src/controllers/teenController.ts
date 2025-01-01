import { Gender, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllTeens = async () => {
    const teens = await prisma.teen.findMany();
    return teens;
};

const getTeenById = async (teenId: number) => {
    try {
        const teen = await prisma.teen.findUnique({
            where: {
                id: teenId,
            },
        });
        return teen;
    } catch (err) {
        console.log(err);
    }
};

const createTeen = async (
    firstName: string,
    lastName: string,
    dateOfBirth: Date,
    gender: Gender,
    phoneNumber: string,
    address: string,
    parentId: number = 1
) => {
    try {
        const teen = await prisma.teen.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: dateOfBirth,
                gender: gender,
                phoneNumber: phoneNumber,
                address: address,
                parentId: parentId,
            },
        });
        return teen;
    } catch (err) {
        return err;
    }
};

export { getAllTeens, getTeenById, createTeen };
