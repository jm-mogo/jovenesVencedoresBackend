import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import { myAccountServices } from "../services/myaccountServices.js";

const getMyAccount = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userAuth: Partial<User> = { ...req.user };

		if (!userAuth.id) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		const user = await myAccountServices.getMyAccount(userAuth.id);

		res.json({ data: user });
	} catch (err) {
		next(err);
	}
};

const updateUsername = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userAuth: Partial<User> = { ...req.user };
		const userBody: Partial<User> = { ...req.body };

		if (!userAuth.id || !userBody.username) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		const user = await myAccountServices.updateMyUsername(
			userAuth.id,
			userBody.username
		);

		if (!user) {
			res.status(409).json({ message: "Username already taken" });
		}

		res.json({ data: user, message: "Username updated" });
	} catch (err) {
		next(err);
	}
};

const updatePassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userAuth: Partial<User> = { ...req.user };
		const userBody: { oldPassword: string; newPassword: string } = {
			...req.body,
		};

		if (!userAuth.id) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		const user = await myAccountServices.updateMyPassword(
			userAuth.id,
			userBody.oldPassword,
			userBody.newPassword
		);

		res.json({ data: user, message: "Password updated" });
	} catch (err) {
		next(err);
	}
};

export { getMyAccount, updateUsername, updatePassword };
