import { body, validationResult } from "express-validator";
import { type Request, type Response, type NextFunction } from "express";
import ApiError from "../utils/ApiError";

export const validateLogin = [
  body("email").isEmail().withMessage("Invalid email format"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, "Validation error", errors.array());
    }
    next();
  },
];
