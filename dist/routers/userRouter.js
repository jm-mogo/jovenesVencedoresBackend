import express from "express";
import { validateAuthorization, validateData, } from "../middlewares/validationMiddleware.js";
import { userLoginSchema, userRegistrationSchema, userUpdateSchema, } from "../schemas/userSchemas.js";
import { loginUser, registerUser, deleteUser, updateUser, } from "../controllers/userController.js";
import passport from "passport";
const userRouter = express.Router();
userRouter.post("/login", validateData(userLoginSchema), loginUser);
userRouter.post("/register", passport.authenticate("jwt", { session: false }), validateAuthorization("owner"), validateData(userRegistrationSchema), registerUser);
userRouter.put("/:id", passport.authenticate("jwt", { session: false }), validateAuthorization("owner"), validateData(userUpdateSchema), updateUser);
userRouter.delete("/:id", passport.authenticate("jwt", { session: false }), validateAuthorization("owner"), deleteUser);
export default userRouter;
//# sourceMappingURL=userRouter.js.map