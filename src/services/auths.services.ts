import AuthsModel from "../models/auths.model";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import { type IAuth } from "../interfaces/auths.interfaces";

export const getAuthByEmail = async (
  email: string,
  platform: string
): Promise<IAuth | null> => {
  try {
    const authDoc = await AuthsModel.findOne({ email, platform });
    return authDoc;
  } catch (error: any) {
    console.error(`Error getUserByEmail: ${error.message}`);
    return null;
  }
};

export const generateAuthToken = async (
  authId: string,
  role: string
): Promise<string | null> => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (JWT_SECRET == null || JWT_SECRET === "") {
    throw new ApiError(500, "JWT secret is not defined");
  }
  try {
    const token = jwt.sign(
      {
        sub: authId,
        role,
      },
      JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );
    return token;
  } catch (error: any) {
    console.error(`Error generateAuthToken: ${error.message}`);
    return null;
  }
};

export const createAuth = async (
  email: string,
  password: string,
  role: string,
  platform: string
): Promise<IAuth | null> => {
  try {
    const authDoc = await AuthsModel.create({
      email,
      password,
      role,
      platform,
    });
    return authDoc;
  } catch (error: any) {
    console.error(`Error createAuth: ${error.message}`);
    return null;
  }
};
