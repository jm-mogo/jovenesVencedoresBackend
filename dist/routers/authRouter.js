import express from "express";
import { register, login } from "../controllers/authController.js"; // Import the controller
const userRouter = express.Router();
userRouter.post("/register", async (req, res) => {
    const { username, password, role, groupId } = req.body;
    try {
        const newUser = await register(username, password, role, groupId);
        res.json(newUser);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
userRouter.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const token = await login(username, password);
        if (token.token) {
            res.json(token.token);
        }
        else {
            res.json(token.message);
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
export default userRouter;
//# sourceMappingURL=authRouter.js.map