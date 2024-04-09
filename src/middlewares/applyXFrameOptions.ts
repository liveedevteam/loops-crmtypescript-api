import { type NextFunction, type Request, type Response } from "express";

export default (
  _err: any,
  _req: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.set("X-Frame-Options", "DENY");
  next();
};
