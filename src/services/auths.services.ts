import AuthsModel from '../models/auths.model';
import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError';

export const getAuthByEmail = async (email: string) => {
    try {
        const authDoc = await AuthsModel.findOne({
            email
        });
        return authDoc;
    } catch (error) {
        console.error(`Error getUserByEmail: ${error}`)
        return null;
    }
}

export const generateAuthToken = async (authId: string) => {
    const { JWT_SECRET } = process.env;
    if (!JWT_SECRET) throw new ApiError(500, 'JWT secret is not defined');
    try {
        const token = jwt.sign({
            sub: authId
        }, JWT_SECRET, {
            expiresIn: '12h'
        })
        return token;
    } catch (error) {
        console.error(`Error generateAuthToken: ${error}`)
        return null;
    }
}