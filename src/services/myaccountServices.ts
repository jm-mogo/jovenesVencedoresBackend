import { PrismaClient, User } from "@prisma/client";
import bcryptjs from "bcryptjs";
import { userServices } from "./userServices.js";

const prisma = new PrismaClient();

const getMyAccount = async (userId: number) => {
	const user: Partial<User> | null = await prisma.user.findUnique({
		where: { id: userId },
	});

	delete user?.password;

	return user;
};

const updateMyUsername = async (userId: number, username: string) => {
	const userExists = await userServices.getUser(username);
	if (userExists) {
		return null;
	}

	const user: Partial<User> | null = await prisma.user.update({
		where: { id: userId },
		data: { username: username },
	});

	return user;
};

const updateMyPassword = async (
	userId: number,
	oldPassword: string,
	newPassword: string
) => {
	const user = await prisma.user.findUnique({ where: { id: userId } });

	if (!user) return null;

	const passwordMatch = await bcryptjs.compare(oldPassword, user.password);

	if (!passwordMatch) return null;

	newPassword = await bcryptjs.hash(newPassword, 10);

	const updatedUser = await prisma.user.update({
		where: { id: userId },
		data: { password: newPassword },
	});

	return updatedUser;
};

export const myAccountServices = {
	getMyAccount,
	updateMyUsername,
	updateMyPassword,
};
