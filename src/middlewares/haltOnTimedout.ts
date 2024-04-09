import { type NextFunction, type Request, type Response } from "express";

export default (
  _err: any,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (!req.timedout) next();
};
