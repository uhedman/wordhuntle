import express from "express";
import { getLeaderboard } from "../controllers/score";

const router = express.Router();

router.get("/leaderboard", getLeaderboard);

export default router;
