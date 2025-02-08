import bcryptjs from "bcryptjs";
import { PrismaClient, Role, User } from "@prisma/client";
import fs from "fs";
import jwt from "jsonwebtoken";

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

const getUser = async (username: string) => {
	const user = await prisma.user.findUnique({ where: { username } });
	return user;
};

const checkPassword = async (userBody: User, user: User): Promise<boolean> => {
	const passwordMatch = await bcryptjs.compare(
		userBody.password,
		user.password
	);
	return passwordMatch;
};

const generateToken = (user: User) => {
	const privateKey = fs.readFileSync("./private.pem", "utf8");
	let token = jwt.sign(
		{ sub: user.id, username: user.username, role: user.role },
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
	deleteUser,
	getUser,
	checkPassword,
	generateToken,
	updateUser,
};
