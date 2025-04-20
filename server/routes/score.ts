import express from "express";
import { submitScore } from "../controllers/scoreController";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.post("/submitScore", authMiddleware, submitScore);

export default router;
