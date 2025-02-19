import express from "express";
import passport from "passport";
import { getMyAccount, updatePassword, updateUsername, } from "../controllers/myAccountController.js";
import { validateData } from "../middlewares/validationMiddleware.js";
import { userUpdatePasswordSchema, userUpdateSchema, } from "../schemas/userSchemas.js";
const myAccountRouter = express.Router();
myAccountRouter.get("/", passport.authenticate("jwt", { session: false }), getMyAccount);
myAccountRouter.put("/username", passport.authenticate("jwt", { session: false }), validateData(userUpdateSchema), updateUsername);
myAccountRouter.put("/password", passport.authenticate("jwt", { session: false }), validateData(userUpdatePasswordSchema), updatePassword);
export default myAccountRouter;
//# sourceMappingURL=myAccountRouter.js.map