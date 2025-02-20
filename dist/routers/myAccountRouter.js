import express from "express";
import passport from "passport";
import { getMyAccount, updatePassword, updateUsername, } from "../controllers/myAccountController.js";
import { validateData } from "../middlewares/validationMiddleware.js";
import { userUpdatePasswordSchema, userUpdateSchema, } from "../schemas/userSchemas.js";
const myAccountRouter = express.Router();
myAccountRouter.use(passport.authenticate("jwt", { session: false }));
myAccountRouter.get("/", getMyAccount);
myAccountRouter.put("/username", validateData(userUpdateSchema), updateUsername);
myAccountRouter.put("/password", validateData(userUpdatePasswordSchema), updatePassword);
export default myAccountRouter;
//# sourceMappingURL=myAccountRouter.js.map