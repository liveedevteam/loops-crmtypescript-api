import { NextFunction, Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';

declare global {
    namespace Express {
        interface Request {
            id?: string;
        }
    }
}

export default (req: Request, res: Response, next: NextFunction) => {
    req.id = uuidv4();
    next();
}