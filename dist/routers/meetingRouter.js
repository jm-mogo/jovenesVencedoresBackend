import { Router } from "express";
import { createMeeting, deleteMeetingById, getMeetingById, } from "../controllers/meetingController.js";
const meetingRouter = Router();
meetingRouter.get("/:id", async (req, res) => {
    try {
        const meetingId = Number(req.params.id);
        const meeting = await getMeetingById(meetingId);
        res.json({ meeting });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
meetingRouter.post("/", async (req, res) => {
    req.body.date = new Date(req.body.date);
    try {
        const newMeeting = await createMeeting(req.body);
        res.status(201).json({
            message: "Meating created successfully",
            newMeeting,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
meetingRouter.delete("/:id", async (req, res) => {
    try {
        const meatingId = Number(req.params.id);
        await deleteMeetingById(meatingId);
        res.json({ message: "Meating deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
export default meetingRouter;
//# sourceMappingURL=meetingRouter.js.map