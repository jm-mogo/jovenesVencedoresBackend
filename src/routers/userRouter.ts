import express from "express";
import { register, login } from "../controllers/userController.js"; // Import the controller
import passport from "passport";

const userRouter = express.Router();

userRouter.post(
	"/register",
	passport.authenticate("jwt", { session: false }),
	async (req, res) => {
		const { username, password, role, groupId } = req.body;
		try {
			if (
				req.user?.role == "primaryOwner" ||
				req.user?.role === "owner"
			) {
				const newUser = await register(
					username,
					password,
					role,
					groupId
				);
				res.json(newUser);
			} else {
				res.status(401).json("unauthorized");
			}
		} catch (err) {
			res.status(500).json({ message: "Server error" });
		}
	}
);
userRouter.post("/login", async (req, res) => {
	const { username, password } = req.body;
	try {
		const token = await login(username, password);
		if (token.token) {
			res.json(token);
		} else {
			res.json({ meesage: token.message });
		}
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
});

export default userRouter;
