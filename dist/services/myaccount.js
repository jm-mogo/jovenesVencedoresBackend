import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";
const prisma = new PrismaClient();
const getMyAccount = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });
    delete user?.password;
    return user;
};
const updateMyUsername = async (userId, username) => {
    const user = await prisma.user.update({
        where: { id: userId },
        data: { username: username },
    });
    return user;
};
const updateMyPassword = async (userId, oldPassword, newPasswrod) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user)
        return;
    const passwordMatch = await bcryptjs.compare(oldPassword, user.password);
    if (!passwordMatch)
        return;
    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { password: newPasswrod },
    });
    return updatedUser;
};
export const myAccountServices = {
    getMyAccount,
    updateMyUsername,
    updateMyPassword,
};
//# sourceMappingURL=myaccount.js.map