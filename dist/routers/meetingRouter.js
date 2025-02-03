import { Router } from "express";
import { createMeeting, deleteMeetingById, getMeetingById, getPointsInMeeting, getTeensInMeeting, getTeensNotInMeeting, } from "../controllers/meetingController.js";
const meetingRouter = Router();
meetingRouter.get("/:id", async (req, res) => {
    try {
        const meetingId = Number(req.params.id);
        const meeting = await getMeetingById(meetingId);
        res.json(meeting);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
meetingRouter.get("/:id/attendances", async (req, res) => {
    try {
        const meetingId = Number(req.params.id);
        const teens = await getTeensInMeeting(meetingId);
        res.json(teens);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
meetingRouter.get("/:id/teens", async (req, res) => {
    try {
        const meetingId = Number(req.params.id);
        const teens = await getTeensNotInMeeting(meetingId);
        res.json(teens);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
meetingRouter.get("/:id/points", async (req, res) => {
    try {
        const meetingId = Number(req.params.id);
        const points = await getPointsInMeeting(meetingId);
        res.json(points);
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});
meetingRouter.post("/", async (req, res) => {
    req.body.date = new Date(req.body.date);
    console.log(req.body.date);
    try {
        const newMeeting = await createMeeting(req.body);
        res.status(201).json(newMeeting);
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