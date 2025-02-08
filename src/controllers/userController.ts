import { User } from "@prisma/client";

import { Request, Response, NextFunction } from "express";
import { userServices } from "../services/userServices.js";

const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userAuth: Partial<User> = { ...req.user };

		const isAuthrorized = await userServices.checkAuthorization(userAuth, [
			"primaryOwner",
			"owner",
		]);

		if (!isAuthrorized) {
			res.status(401).json();
			return;
		}

		const userBody: User = { ...req.body };
		const user = await userServices.createUser(userBody);

		if (!user) {
			res.status(409).json({ message: "Username is already taken" });
			return;
		}

		res.status(201).json({ message: "User created", data: user });
	} catch (err) {
		next(err);
	}
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userBody: User = { ...req.body };
		const user = await userServices.getUser(userBody.username);

		if (!user) {
			res.status(404).json({ message: "Username not found" });
			return;
		}

		const passwordMatch = await userServices.checkPassword(userBody, user);

		if (!passwordMatch) {
			res.status(401).json({ message: "Invalid credentials" });
			return;
		}

		const token = userServices.generateToken(user);

		res.json({ message: "Login successful", token });
	} catch (err) {
		next(err);
	}
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const userAuth: Partial<User> = { ...req.user };
		const isAuthrorized = await userServices.checkAuthorization(userAuth, [
			"primaryOwner",
			"owner",
		]);

		if (!isAuthrorized) {
			res.status(401).json();
			return;
		}

		const id = Number(req.params.id);
		const userBody: Partial<User> = { ...req.body };
		const updatedUser = await userServices.updateUser(id, userBody);

		if (!updatedUser) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		res.status(200).json({ message: "User updated", data: updatedUser });
	} catch (err) {
		next(err);
	}
};

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
	const id = Number(req.params.id);
	try {
		const userAuth: Partial<User> = { ...req.user };
		const isAuthrorized = await userServices.checkAuthorization(userAuth, [
			"primaryOwner",
			"owner",
		]);

		if (!isAuthrorized) {
			res.status(401).json();
			return;
		}

		const userDeleted = await userServices.deleteUser(id);
		if (!userDeleted) {
			res.status(404).json({ message: "User not found" });
			return;
		}
		res.status(204).json({ message: "User deleted", data: userDeleted });
	} catch (err) {
		next(err);
	}
};

export { registerUser, loginUser, deleteUser, updateUser };
