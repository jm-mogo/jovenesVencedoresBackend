import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient, Role } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

const register = async (
	username: string,
	password: string,
	role: Role,
	groupId: number
) => {
	try {
		const existingUser = await prisma.user.findUnique({
			where: { username },
		});
		if (existingUser) {
			return { message: "Username already exists" };
		}

		const hashedPassword = await bcryptjs.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				username: username,
				password: hashedPassword,
				role: role,
				groupId: groupId,
			},
		});

		return user;
	} catch (err) {
		console.error("Error registering user:", err);
		return err;
	}
};

const login = async (username: string, password: string) => {
	try {
		const user = await prisma.user.findUnique({ where: { username } });
		if (!user) {
			return { message: "Invalid credentials" };
		}

		const passwordMatch = await bcryptjs.compare(password, user.password);
		if (!passwordMatch) {
			return { message: "Invalid credentials" };
		}

		const privateKey = fs.readFileSync("./private.pem", "utf8");
		let token = jwt.sign(
			{ sub: user.id, username: user.username, role: user.role },
			privateKey,
			{
				algorithm: "RS256",
			}
		);

		token = "Bearer " + token;

		return { token: token, user: user };
	} catch (err) {
		console.error("Error logging in user:", err);
		return { message: "Something went wrong" };
	}
};

export { register, login };
