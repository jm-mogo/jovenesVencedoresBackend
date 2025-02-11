import { Parent, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createParent = async (parentBody: Parent) => {
	const parent = await prisma.parent.create({
		data: parentBody,
	});
	return parent;
};

const getParents = async (groupId: number) => {
	const parents = await prisma.parent.findMany({
		where: {
			groupId: groupId,
		},
	});
	return parents;
};

const getParent = async (parentId: number) => {
	const parent = await prisma.parent.findUnique({
		where: {
			id: parentId,
		},
		include: {
			teens: true,
		},
	});

	return parent;
};

const updateParent = async (parentId: number, parentBody: Parent) => {
	const parent = await prisma.parent.update({
		where: {
			id: parentId,
		},
		data: parentBody,
	});
	return parent;
};

const deleteParent = async (parentId: number) => {
	const parentDeleted = await prisma.parent.delete({
		where: {
			id: parentId,
		},
	});
	return parentDeleted;
};

export const parentServises = {
	createParent,
	getParents,
	getParent,
	updateParent,
	deleteParent,
};
