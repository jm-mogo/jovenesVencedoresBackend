import { Group, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const createGroup = async (groupBody: Group) => {
	const group = await prisma.group.create({
		data: groupBody,
	});
	return group;
};

const getGroups = async () => {
	const groups = await prisma.group.findMany({
		where: {
			id: {
				notIn: [1],
			},
		},
	});
	return groups;
};

const getGroup = async (groupId: number) => {
	const group = await prisma.group.findUnique({
		where: {
			id: groupId,
		},
		include: {
			users: true,
		},
	});
	if (!group) {
		return null;
	}

	return group;
};

const updateGroup = async (gropId: number, groupBody: Partial<Group>) => {
	const group = await prisma.group.update({
		where: { id: gropId },
		data: groupBody,
	});
	return group;
};

const deleteGroup = async (groupId: number) => {
	const user = await prisma.user.delete({
		where: { id: groupId },
	});
	return user;
};

export const groupServices = {
	getGroups,
	getGroup,
	createGroup,
	updateGroup,
	deleteGroup,
};
