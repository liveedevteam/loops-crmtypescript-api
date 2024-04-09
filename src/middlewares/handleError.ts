import { type NextFunction, type Request, type Response } from "express";
import ApiError from "../utils/ApiError";

export default (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
    });
  } else {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong on the server." });
  }
};
