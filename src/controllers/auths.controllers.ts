import { type Request, type Response } from "express";
import { compareSync, hash } from "bcryptjs";
import { verify } from "jsonwebtoken";
import {
  createAuth,
  generateAuthToken,
  getAuthByEmail,
} from "../services/auths.services";
import ApiError from "../utils/ApiError";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password, platform } = req.body;
  const auth = await getAuthByEmail(email, platform);
  if (auth === null) {
    throw new ApiError(401, "Email or password is incorrect");
  }
  const passwordMatch = compareSync(password, auth.password);
  if (!passwordMatch) {
    throw new ApiError(401, "Email or password is incorrect");
  }
  const id = auth._id.toString();
  const role = auth.role;
  const token = await generateAuthToken(id, role);
  if (token === null) {
    throw new ApiError(500, "Internal server error");
  }
  res.status(200).json({
    message: "Login successful",
    result: {
      token,
    },
  });
};

export const register = async (req: Request, res: Response): Promise<void> => {
  const { email, password, role, platform } = req.body;
  const auth = await getAuthByEmail(email, platform);
  if (auth !== null) {
    throw new ApiError(400, "Email already exists");
  }
  const encryptedPassword = await hash(password, 12);
  const authDoc = await createAuth(email, encryptedPassword, role, platform);
  if (authDoc === null) {
    throw new ApiError(500, "Create auth failed");
  }
  res.status(201).json({
    message: "Register successful",
  });
};

export const verifyToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { accessToken } = req.query;
  const JWT_SECRET = process.env.JWT_SECRET;
  if (JWT_SECRET == null || JWT_SECRET === "") {
    throw new ApiError(500, "JWT secret is not defined");
  }
  const decode = verify(accessToken as string, JWT_SECRET);
  res.status(200).json({
    message: "Token is valid",
    result: decode,
  });
};
