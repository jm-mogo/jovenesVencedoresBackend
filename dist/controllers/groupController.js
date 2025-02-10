import { groupServices } from "../services/groupServices.js";
const createGroup = async (req, res, next) => {
    try {
        const groupBody = { ...req.body };
        const group = await groupServices.createGroup(groupBody);
        res.status(201).json({ message: "Group created", data: group });
    }
    catch (err) {
        next(err);
    }
};
const getGroups = async (req, res, next) => {
    try {
        const groups = await groupServices.getGroups();
        res.json({ data: groups });
        return;
    }
    catch (err) {
        next(err);
    }
};
const getGroup = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const group = await groupServices.getGroup(id);
        if (!group) {
            res.status(404).json({ message: "Group not found" });
            return;
        }
        res.json({ data: group });
    }
    catch (err) {
        next(err);
    }
};
const updateGroup = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const groupBody = { ...req.body };
        const groupUpdated = await groupServices.updateGroup(id, groupBody);
        if (!groupUpdated) {
            res.status(404).json({ message: "Group not found" });
            return;
        }
        res.status(200).json({ message: "Group updated", data: groupUpdated });
    }
    catch (err) {
        next(err);
    }
};
const deleteGroup = async (req, res, next) => {
    const id = Number(req.params.id);
    try {
        const groupDeleted = await groupServices.deleteGroup(id);
        if (!groupDeleted) {
            res.status(404).json({ message: "Group not found" });
            return;
        }
        res.status(204).json({ message: "Group deleted", data: groupDeleted });
    }
    catch (err) {
        next(err);
    }
};
export { createGroup, getGroups, getGroup, updateGroup, deleteGroup };
//# sourceMappingURL=groupController.js.map