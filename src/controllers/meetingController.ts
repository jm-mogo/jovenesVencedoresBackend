import { Request, Response, NextFunction } from "express";
import { meetingServices } from "../services/meetingServices.js";
import { Meeting } from "@prisma/client";

const createMeeting = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const meetingBody: Meeting = { ...req.body };
		meetingBody.date = new Date(meetingBody.date);

		const meeting = await meetingServices.createMeeting(meetingBody);

		res.status(201).json({ message: "Meeting created", data: meeting });
	} catch (err) {
		next(err);
	}
};

const getMeeting = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const meetingId: number = Number(req.params.id);
		const meeting = await meetingServices.getMeeting(meetingId);

		if (!meeting) {
			res.status(404).json({ message: "Meeting not found" });
			return;
		}

		res.json({ data: meeting });
	} catch (err) {
		next(err);
	}
};

const getTeensInMeeting = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const meetingId: number = Number(req.params.id);
		const teens = await meetingServices.getTeensInMeeting(meetingId);

		res.json({ data: teens });
	} catch (err) {
		next(err);
	}
};

const getTeensNotInMeeting = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const meetingId: number = Number(req.params.id);
		const teens = await meetingServices.getTeensNotInMeeting(meetingId);
		res.json({ data: teens });
	} catch (err) {
		next(err);
	}
};

const getPointsInMeeting = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const meetingId: number = Number(req.params.id);
		const points = await meetingServices.getPointsInMeeting(meetingId);
		res.json({ data: points });
	} catch (err) {
		next(err);
	}
};

const updateMeeting = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const meetingId: number = Number(req.params.id);
		const meetingBody: Meeting = { ...req.body };

		const meeting = await meetingServices.updateMeeting(
			meetingId,
			meetingBody
		);

		res.json({ message: "Meeting updated", data: meeting });
	} catch (err) {
		next(err);
	}
};

const deleteMeeting = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const meatingId = Number(req.params.id);
		const meetingDeleted = await meetingServices.deleteMeeting(meatingId);

		if (!meetingDeleted) {
			res.status(404).json({ message: "Meeting not found" });
		}

		res.json({ message: "Meating deleted successfully" });
	} catch (err) {
		next(err);
	}
};

export {
	createMeeting,
	getMeeting,
	getTeensInMeeting,
	getTeensNotInMeeting,
	getPointsInMeeting,
	updateMeeting,
	deleteMeeting,
};
