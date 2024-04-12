import express from "express";
import { login, register, verifyToken } from "../controllers/auths.controllers";
import asyncHandler from "../utils/asyncHandler";
import { validateLogin } from "../middlewares/validateLoginFn";
import { validateVerify } from "../middlewares/validateVerifyFn";
import { validateRegister } from "../middlewares/validateRegisterFn";

const router = express.Router();

router.get("/verify/email-password", validateVerify, asyncHandler(verifyToken));
router.post("/login/email-password", validateLogin, asyncHandler(login));
router.post(
  "/register/email-password",
  validateRegister,
  asyncHandler(register)
);

export default router;
