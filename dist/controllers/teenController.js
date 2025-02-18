import { teenServices } from "../services/teenServices.js";
const createTeen = async (req, res, next) => {
    try {
        const userAuth = { ...req.user };
        if (!userAuth.groupId) {
            res.status(401).json("Unauthorized");
            return;
        }
        const teenBody = { ...req.body };
        teenBody.dateOfBirth = new Date(teenBody.dateOfBirth);
        teenBody.groupId = userAuth.groupId;
        const teen = await teenServices.createTeen(teenBody);
        res.status(201).json({
            messsage: "Teen created",
            data: teen,
        });
    }
    catch (err) {
        next(err);
    }
};
const getTeens = async (req, res, next) => {
    try {
        const userAuth = { ...req.user };
        if (!userAuth.groupId) {
            res.status(401).json("Unauthorized");
            return;
        }
        const teens = await teenServices.getTeens(userAuth.groupId);
        res.json({ data: teens });
    }
    catch (err) {
        next(err);
    }
};
const getTeen = async (req, res, next) => {
    try {
        const teenId = Number(req.params.id);
        const userAuth = { ...req.user };
        const hasAccess = await teenServices.canAccessTeen(userAuth, teenId);
        if (!hasAccess) {
            res.status(403).json("Forbidden");
            return;
        }
        const teen = await teenServices.getTeen(teenId);
        if (!teen) {
            res.status(404).json("Teen not found");
            return;
        }
        res.json({ data: teen });
    }
    catch (err) {
        next(err);
    }
};
const updateTeen = async (req, res, next) => {
    const teenId = Number(req.params.id);
    try {
        const teenUpdated = await teenServices.updateTeen(teenId, req.body);
        res.json({
            message: "Teen updated",
            data: teenUpdated,
        });
    }
    catch (err) {
        next(err);
    }
};
const deleteTeen = async (req, res, next) => {
    try {
        const teenId = Number(req.params.id);
        //Check if this user can acces this teen
        const userAuth = { ...req.user };
        const hasAccess = await teenServices.canAccessTeen(userAuth, teenId);
        if (!hasAccess) {
            res.status(403).json("Forbidden");
            return;
        }
        await teenServices.deleteTeen(teenId);
        res.status(204).json();
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
export { getTeens, getTeen, createTeen, deleteTeen, updateTeen };
//# sourceMappingURL=teenController.js.map