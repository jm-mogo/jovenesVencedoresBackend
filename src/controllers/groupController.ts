import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createGroup = async (name: string, churchName: string) => {
	try {
		const newGroup = await prisma.group.create({
			data: {
				name: name,
				churchName: churchName,
			},
		});
		return newGroup;
	} catch (err) {
		return err;
	}
};

const getGroups = async () => {
	try {
		const groups = await prisma.group.findMany({
			where: {
				id: {
					notIn: [1],
				},
			},
		});
		return groups;
	} catch (err) {
		return err;
	}
};

const getGroupById = async (id: number) => {
	try {
		const group = await prisma.group.findFirst({
			where: {
				id: id,
			},
			include: {
				users: true,
			},
		});
		return group;
	} catch (err) {
		return err;
	}
};

export { createGroup, getGroups, getGroupById };
