import express from "express";
import { validateData } from "../middlewares/validationMiddleware.js";
import {
	userLoginSchema,
	userRegistrationSchema,
	userUpdateSchema,
} from "../schemas/userSchemas.js";
import {
	loginUser,
	registerUser,
	deleteUser,
	updateUser,
} from "../controllers/userController.js"; // Import the controller

const userRouter = express.Router();

userRouter.post(
	"/register",
	validateData(userRegistrationSchema),
	registerUser
);

userRouter.put("/:id", validateData(userUpdateSchema), updateUser);

userRouter.post("/login", validateData(userLoginSchema), loginUser);

userRouter.delete("/:id", deleteUser);

export default userRouter;
