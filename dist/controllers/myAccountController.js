import { myAccountServices } from "../services/myaccountServices.js";
const getMyAccount = async (req, res, next) => {
    try {
        const userAuth = { ...req.user };
        if (!userAuth.id) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const user = await myAccountServices.getMyAccount(userAuth.id);
        res.json({ data: user });
    }
    catch (err) {
        next(err);
    }
};
const updateUsername = async (req, res, next) => {
    try {
        const userAuth = { ...req.user };
        const userBody = { ...req.body };
        if (!userAuth.id || !userBody.username) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const user = await myAccountServices.updateMyUsername(userAuth.id, userBody.username);
        if (!user) {
            res.status(409).json({ message: "Username already taken" });
        }
        res.json({ data: user, message: "Username updated" });
    }
    catch (err) {
        next(err);
    }
};
const updatePassword = async (req, res, next) => {
    try {
        const userAuth = { ...req.user };
        const userBody = {
            ...req.body,
        };
        if (!userAuth.id) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const user = await myAccountServices.updateMyPassword(userAuth.id, userBody.oldPassword, userBody.newPassword);
        if (!user) {
            res.status(401).json("Invalid credentials");
            return;
        }
        res.json({ data: user, message: "Password updated" });
    }
    catch (err) {
        next(err);
    }
};
export { getMyAccount, updateUsername, updatePassword };
//# sourceMappingURL=myAccountController.js.map