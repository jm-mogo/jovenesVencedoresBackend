import { PrismaClient, Teen, User } from "@prisma/client";

const prisma = new PrismaClient();

const createTeen = async (teenBody: Teen) => {
	const teen = await prisma.teen.create({
		data: teenBody,
	});
	return teen;
};

const getTeens = async (groupId: number) => {
	const teens = await prisma.teen.findMany({
		where: {
			groupId: groupId,
		},
	});
	return teens;
};

const getTeen = async (teenId: number) => {
	const teen = await prisma.teen.findUnique({
		where: {
			id: teenId,
		},
		include: {
			parent: true,
		},
	});
	return teen;
};

const updateTeen = async (teenId: number, teenBody: Partial<Teen>) => {
	const teen = await prisma.teen.update({
		where: {
			id: teenId,
		},
		data: teenBody,
	});

	return teen;
};

const deleteTeen = async (teenId: number) => {
	const teen = await prisma.teen.delete({
		where: {
			id: teenId,
		},
	});

	return teen;
};

const canAccessTeen = async (userAuth: Partial<User>, teenId: number) => {
	const teen = await getTeen(teenId);

	if (!userAuth.groupId || !teen) {
		return false;
	}

	if (userAuth.groupId !== teen.groupId) {
		return false;
	}
	return true;
};

export const teenServices = {
	createTeen,
	getTeens,
	getTeen,
	updateTeen,
	deleteTeen,
	canAccessTeen,
};
