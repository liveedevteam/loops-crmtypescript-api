import express from "express";
import asyncHandler from "../utils/asyncHandler";

const router = express.Router();

router.get("/send", asyncHandler(async (req, res) => {}));
router.post("/verify", asyncHandler(async (req, res) => {}));
router.patch("/cancel", asyncHandler(async (req, res) => {}));

