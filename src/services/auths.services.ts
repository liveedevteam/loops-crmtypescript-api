import AuthsModel from "../models/auths.model";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError";
import { type IAuth } from "../interfaces/auths.interfaces";

export const getAuthByEmail = async (email: string): Promise<IAuth | null> => {
  try {
    const authDoc = await AuthsModel.findOne({ email });
    return authDoc;
  } catch (error: any) {
    console.error(`Error getUserByEmail: ${error.message}`);
    return null;
  }
};

export const generateAuthToken = async (
  authId: string,
): Promise<string | null> => {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (JWT_SECRET == null || JWT_SECRET === "") {
    throw new ApiError(500, "JWT secret is not defined");
  }
  try {
    const token = jwt.sign({ sub: authId }, JWT_SECRET, { expiresIn: "12h" });
    return token;
  } catch (error: any) {
    console.error(`Error generateAuthToken: ${error.message}`);
    return null;
  }
};
