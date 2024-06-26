import { body, validationResult } from "express-validator";
import { type Request, type Response, type NextFunction } from "express";
import ApiError from "../utils/ApiError";

export const validateLogin = [
  body("email")
    .exists()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .exists()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("platform")
    .exists()
    .withMessage("Platform is required")
    .isString()
    .withMessage("Platform must be a string")
    .isIn(["event", "station"])
    .withMessage("Platform is invalid"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, "Validation error", errors.array());
    }
    next();
  },
];
