import { query, validationResult } from "express-validator";
import { type Request, type Response, type NextFunction } from "express";
import ApiError from "../utils/ApiError";

export const validateVerify = [
  query("accessToken")
    .notEmpty()
    .withMessage("accessToken is required")
    .isJWT()
    .withMessage("accessToken must be a valid JWT"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new ApiError(400, "Validation error", errors.array());
    }
    next();
  },
];
