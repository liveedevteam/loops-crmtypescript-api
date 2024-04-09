import express from "express";
import { login } from "../controllers/auths.controllers";
import asyncHandler from "../utils/asyncHandler";
import { validateLogin } from "../middlewares/validateLoginFn";

const router = express.Router();

router.post("/login", validateLogin, asyncHandler(login));

export default router;
