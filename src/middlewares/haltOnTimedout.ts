import { NextFunction, Request, Response } from "express";

export default async (err: any, req: Request, res: Response, next: NextFunction) => {
    if (!req.timedout) next();
}