import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
    createTeen,
    deleteTeenById,
    getAllTeens,
    getTeenById,
} from "../controllers/teenController.js";

const teenRouter = Router();

teenRouter.get("/", async (req, res) => {
    const teens = await getAllTeens();
    res.json({ teens });
});

teenRouter.get("/:id", async (req, res) => {
    const teenId: number = Number(req.params.id);
    const teen = await getTeenById(teenId);
    res.json({ teen });
});

teenRouter.post(
    "/",
    [
        body("firstName").notEmpty().withMessage("First name is required"),
        body("lastName").notEmpty().withMessage("Last name is required"),
        body("dateOfBirth").isISO8601().withMessage("Invalid date format"),
        body("gender").isIn(["M", "F"]).withMessage("Invalid gender"),
    ],
    async (req: any, res: any) => {
        const {
            firstName,
            lastName,
            dateOfBirth,
            gender,
            phoneNumber,
            address,
            parentId,
        } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newTeen = await createTeen(
                firstName,
                lastName,
                new Date(dateOfBirth),
                gender,
                phoneNumber,
                address,
                parentId
            );

            res.status(201).json({
                messsage: "Teen created succesfully",
                teen: newTeen,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);

teenRouter.delete("/:id", async (req, res) => {
    const teenId: number = Number(req.params.id);
    try {
        await deleteTeenById(teenId);
        res.status(204).json({
            message: "Teen deleted succesfully",
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default teenRouter;
