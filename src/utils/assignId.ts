import { type NextFunction, type Request, type Response } from "express";
import { v4 as uuidv4 } from "uuid";

declare module "express" {
  interface Request {
    id?: string;
  }
}

const assignId = (req: Request, res: Response, next: NextFunction): void => {
  req.id = uuidv4();
  next();
};

export default assignId;
