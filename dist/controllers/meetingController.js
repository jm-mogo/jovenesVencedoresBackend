import { meetingServices } from "../services/meetingServices.js";
const createMeeting = async (req, res, next) => {
    try {
        const meetingBody = { ...req.body };
        meetingBody.date = new Date(meetingBody.date);
        const meeting = await meetingServices.createMeeting(meetingBody);
        res.status(201).json({ message: "Meeting created", data: meeting });
    }
    catch (err) {
        next(err);
    }
};
const getMeeting = async (req, res, next) => {
    try {
        const meetingId = Number(req.params.id);
        const meeting = await meetingServices.getMeeting(meetingId);
        if (!meeting) {
            res.status(404).json({ message: "Meeting not found" });
            return;
        }
        res.json({ data: meeting });
    }
    catch (err) {
        next(err);
    }
};
const getTeensInMeeting = async (req, res, next) => {
    try {
        const meetingId = Number(req.params.id);
        const teens = await meetingServices.getTeensInMeeting(meetingId);
        res.json({ data: teens });
    }
    catch (err) {
        next(err);
    }
};
const getTeensNotInMeeting = async (req, res, next) => {
    try {
        const meetingId = Number(req.params.id);
        const teens = await meetingServices.getTeensNotInMeeting(meetingId);
        res.json({ data: teens });
    }
    catch (err) {
        next(err);
    }
};
const getPointsInMeeting = async (req, res, next) => {
    try {
        const meetingId = Number(req.params.id);
        const points = await meetingServices.getPointsInMeeting(meetingId);
        res.json({ data: points });
    }
    catch (err) {
        next(err);
    }
};
const updateMeeting = async (req, res, next) => {
    try {
        const meetingId = Number(req.params.id);
        const meetingBody = { ...req.body };
        const meeting = await meetingServices.updateMeeting(meetingId, meetingBody);
        res.json({ message: "Meeting updated", data: meeting });
    }
    catch (err) {
        next(err);
    }
};
const deleteMeeting = async (req, res, next) => {
    try {
        const meatingId = Number(req.params.id);
        const meetingDeleted = await meetingServices.deleteMeeting(meatingId);
        if (!meetingDeleted) {
            res.status(404).json({ message: "Meeting not found" });
        }
        res.status(204).json();
    }
    catch (err) {
        next(err);
    }
};
export { createMeeting, getMeeting, getTeensInMeeting, getTeensNotInMeeting, getPointsInMeeting, updateMeeting, deleteMeeting, };
//# sourceMappingURL=meetingController.js.map