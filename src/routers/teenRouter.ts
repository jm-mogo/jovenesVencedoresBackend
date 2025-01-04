import { Router } from "express";
import { body, validationResult } from "express-validator";
import {
    createTeen,
    deleteTeenById,
    getAllTeens,
    getTeenById,
    updateTeenById,
} from "../controllers/teenController.js";

const teenRouter = Router();

const validateTeen = [
    body("firstName").notEmpty().withMessage("First name is required"),
    body("lastName").notEmpty().withMessage("Last name is required"),
    body("dateOfBirth").isISO8601().withMessage("Invalid date format"),
    body("gender").isIn(["M", "F"]).withMessage("Invalid gender"),
    body("phoneNumber")
        .optional()
        .isLength({ min: 11, max: 11 })
        .withMessage("Phone number must be 11 digits"),
];

teenRouter.get("/", async (req, res) => {
    const teens = await getAllTeens();
    res.json({ teens });
});

teenRouter.get("/:id", async (req, res) => {
    const teenId: number = Number(req.params.id);
    const teen = await getTeenById(teenId);
    res.json({ teen });
});

teenRouter.post("/", validateTeen, async (req: any, res: any) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    req.body.dateOfBirth = new Date(req.body.dateOfBirth);

    try {
        const newTeen = await createTeen(req.body);

        res.status(201).json({
            messsage: "Teen created succesfully",
            teen: newTeen,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

teenRouter.put(
    "/:id",
    [
        body("firstName")
            .optional()
            .notEmpty()
            .withMessage("First name is required"),
        body("lastName")
            .optional()
            .notEmpty()
            .withMessage("Last name is required"),
        body("dateOfBirth")
            .optional()
            .isISO8601()
            .withMessage("Invalid date format"),
        body("gender")
            .optional()
            .isIn(["M", "F"])
            .withMessage("Invalid gender"),
        body("phoneNumber")
            .optional()
            .isLength({ min: 11, max: 11 })
            .withMessage("Phone number must be 11 digits"),
    ],

    async (req: any, res: any) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const teenId: number = Number(req.params.id);
        try {
            const teenUpdated = await updateTeenById(teenId, req.body);
            res.status(200).json({
                message: "updated successfully",
                teen: teenUpdated,
            });
        } catch (err) {
            res.status(500).json({ message: "Server error" });
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
