import bcryptjs from "bcryptjs";
import { PrismaClient, Role, User } from "@prisma/client";
import fs from "fs";
import jwt from "jsonwebtoken";
import passport from "passport";
import { PRIVATE_KEY } from "../config/config.js";

const prisma = new PrismaClient();

const createUser = async (userBody: User) => {
	const userExists = await getUser(userBody.username);
	if (userExists) {
		return null;
	}
	userBody.password = await bcryptjs.hash(userBody.password, 10);

	const user = await prisma.user.create({
		data: userBody,
	});

	return user;
};

const getUser = async (username: string) => {
	const user = await prisma.user.findUnique({
		where: { username },
	});
	if (!user) {
		return null;
	}

	return user;
};

const updateUser = async (id: number, userBody: Partial<User>) => {
	if (userBody.password) {
		userBody.password = await bcryptjs.hash(userBody.password, 10);
	}

	const user = await prisma.user.update({
		where: { id },
		data: userBody,
	});
	return user;
};

const deleteUser = async (id: number) => {
	const user = await prisma.user.delete({
		where: { id },
	});
	return user;
};

const checkAuthorization = async (userAuth: Partial<User>, roles: Role[]) => {
	if (!userAuth.role) {
		return false;
	}

	if (roles.includes(userAuth.role)) {
		return true;
	}

	return false;
};

const checkPassword = async (userBody: User, user: User): Promise<boolean> => {
	const passwordMatch = await bcryptjs.compare(
		userBody.password,
		user.password
	);
	return passwordMatch;
};

const generateToken = async (user: User) => {
	const group = await prisma.group.findUnique({
		where: { id: user.groupId },
	});

	// const privateKey = fs.readFileSync("./private.pem", "utf8");
	const privateKey = PRIVATE_KEY.replace(/\\n/g, "\n");

	let token = jwt.sign(
		{
			sub: user.id,
			username: user.username,
			role: user.role,
			groupId: user.groupId,
			groupName: group?.name,
		},
		privateKey,
		{
			algorithm: "RS256",
		}
	);
	token = "Bearer " + token;
	return token;
};

export const userServices = {
	createUser,
	updateUser,
	getUser,
	deleteUser,
	checkPassword,
	generateToken,
	checkAuthorization,
};
