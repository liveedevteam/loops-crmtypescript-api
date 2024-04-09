import { Request, Response } from 'express';
import { login } from '../../controllers/auths.controllers';
import bcrypt from 'bcryptjs';
import ApiError from '../../utils/ApiError';
import * as authsServices from '../../services/auths.services';

jest.mock('../../services/auths.services');

describe('login', () => {
    let req: Request;
    let res: Response;
    let auth: any;

    beforeEach(() => {
        req = {
            body: {
                email: 'test@example.com',
                password: 'password123'
            }
        } as Request;
        res = {
            json: jest.fn()
        } as unknown as Response;
        auth = {
            _id: '123',
            email: 'test@example.com',
            password: 'password123',
            platform: 'event',
            role: 'admin',
            createdAt: new Date(),
            updatedAt: new Date()
        };
        jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return a token if login is successful', async () => {
        const hashedPassword = bcrypt.hashSync('password123', 10);
        auth.password = hashedPassword;
        jest.spyOn(authsServices, 'getAuthByEmail').mockResolvedValueOnce(auth as any);
        jest.spyOn(authsServices, 'generateAuthToken').mockResolvedValueOnce('token123');

        await login(req, res);

        expect(authsServices.getAuthByEmail).toHaveBeenCalledWith('test@example.com');
        expect(bcrypt.compareSync).toHaveBeenCalledWith('password123', hashedPassword);
        expect(authsServices.generateAuthToken).toHaveBeenCalledWith('123');
        expect(res.json).toHaveBeenCalledWith({
            message: 'Login successful',
            result: {
                token: 'token123'
            }
        });
    });

    it('should throw an error if token generation fails', async () => {
        const auth = {
            _id: '123',
            password: 'hashedPassword'
        };
        (authsServices.getAuthByEmail as jest.Mock).mockResolvedValueOnce(auth);
        (bcrypt.compareSync as jest.Mock).mockReturnValueOnce(true);
        (authsServices.generateAuthToken as jest.Mock).mockReturnValueOnce(null);

        await expect(login(req, res)).rejects.toThrow(ApiError);
        expect(authsServices.getAuthByEmail).toHaveBeenCalledWith('test@example.com');
        expect(bcrypt.compareSync).toHaveBeenCalledWith('password123', 'hashedPassword');
        expect(authsServices.generateAuthToken).toHaveBeenCalledWith('123');
        expect(res.json).not.toHaveBeenCalled();
    });

    it('should throw an error if email or password is incorrect', async () => {
        (authsServices.getAuthByEmail as jest.Mock).mockResolvedValueOnce(null);

        await expect(login(req, res)).rejects.toThrow(ApiError);
        expect(authsServices.getAuthByEmail).toHaveBeenCalledWith('test@example.com');
        expect(bcrypt.compareSync).not.toHaveBeenCalled();
        expect(authsServices.generateAuthToken).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });
});
