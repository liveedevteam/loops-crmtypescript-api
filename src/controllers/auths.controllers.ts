import { type Request, type Response } from "express";
import { generateAuthToken, getAuthByEmail } from "../services/auths.services";
import ApiError from "../utils/ApiError";
import { compareSync } from "bcryptjs";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  if (typeof email !== "string" || typeof password !== "string") {
    throw new ApiError(400, "Email and password must be provided");
  }
  const auth = await getAuthByEmail(email);
  if (auth === null) {
    throw new ApiError(401, "Email or password is incorrect");
  }
  const passwordMatch = compareSync(password, auth.password);
  if (!passwordMatch) {
    throw new ApiError(401, "Email or password is incorrect");
  }
  const token = await generateAuthToken(auth._id.toString());
  if (token === null) {
    throw new ApiError(500, "Internal server error");
  }
  res.json({
    message: "Login successful",
    result: {
      token,
    },
  });
};
