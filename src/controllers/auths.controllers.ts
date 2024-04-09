import { Request, Response } from 'express';
import { generateAuthToken, getAuthByEmail } from '../services/auths.services';
import ApiError from '../utils/ApiError';
import { compareSync } from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const auth = await getAuthByEmail(email);
    if (!auth) {
        throw new ApiError(401, "Email or password is incorrect");
    }
    const passwordMatch = await compareSync(password, auth.password);
    if (!passwordMatch) {
        throw new ApiError(401, "Email or password is incorrect");
    }
    const token = generateAuthToken(auth._id.toString());
    if (!token) {
        throw new ApiError(500, "Internal server error");
    }
    res.json({
        message: "Login successful",
        result: {
            token
        }
    });
}