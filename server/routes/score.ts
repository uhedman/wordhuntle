import express from "express";
import { getLeaderboard, submitScore } from "../controllers/scoreController";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/leaderboard", getLeaderboard);

router.put("/", authMiddleware, submitScore);

export default router;
