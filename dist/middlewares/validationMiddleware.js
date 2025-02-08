import { ZodError } from "zod";
import { userServices } from "../services/userServices.js";
const PRIMARY_OWNER = "primaryOwner";
const OWNER = "owner";
const ADMIN = "admin";
export function validateAuthorization(role) {
    return async (req, res, next) => {
        try {
            const userAuth = { ...req.user };
            const rolesAllowed = [];
            switch (role) {
                case PRIMARY_OWNER:
                    rolesAllowed.push(PRIMARY_OWNER);
                    break;
                case OWNER:
                    rolesAllowed.push(PRIMARY_OWNER, OWNER);
                    break;
                case ADMIN:
                    rolesAllowed.push(PRIMARY_OWNER, OWNER, ADMIN);
            }
            const isAuthrorized = await userServices.checkAuthorization(userAuth, rolesAllowed);
            if (!isAuthrorized) {
                res.status(401).json();
                return;
            }
            next();
        }
        catch (err) {
            next(err);
        }
    };
}
export function validateData(schema) {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.map((issue) => ({
                    message: `${issue.path.join(".")} is ${issue.message}`,
                }));
                res.status(400).json({
                    error: "Invalid data",
                    details: errorMessages,
                });
            }
            else {
                res.status(500).json({
                    error: "Internal Server Error",
                });
            }
        }
    };
}
//# sourceMappingURL=validationMiddleware.js.map