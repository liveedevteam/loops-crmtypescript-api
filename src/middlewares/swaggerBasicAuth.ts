// src/middlewares/authMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export const swaggerBasicAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || '';
    const [type, payload] = authHeader.split(' ');
    const { SWAGGER_USERNAME, SWAGGER_PASSWORD } = process.env;

    if (type === 'Basic') {
        // For simplicity, using base64 encoding of 'username:password'
        const [username, password] = Buffer.from(payload, 'base64').toString().split(':');

        // Replace these with your actual username and password
        if (username === SWAGGER_USERNAME && password === SWAGGER_PASSWORD) {
            return next();
        }
    }

    // Request is not authenticated. Send a 401 response.
    res.setHeader('WWW-Authenticate', 'Basic realm="401"');
    res.status(401).send('Authentication required.');
};
