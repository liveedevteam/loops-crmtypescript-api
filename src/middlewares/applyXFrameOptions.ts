import { NextFunction, Request, Response } from "express";

export default async (err: any, req: Request, res: Response, next: NextFunction) => {
    res.set('X-Frame-Options', 'DENY');
    next();
}