import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
const prisma = new PrismaClient();
const register = async (username, password, role, groupId) => {
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
    }
    catch (err) {
        console.error("Error registering user:", err);
        return err;
    }
};
const login = async (username, password) => {
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
        const token = jwt.sign({ sub: user.id }, privateKey, {
            algorithm: "RS256",
        });
        return { token: token };
    }
    catch (err) {
        console.error("Error logging in user:", err);
        return { message: "Something went wrong" };
    }
};
export { register, login };
//# sourceMappingURL=authController.js.map