import express from "express";

import { createGetLeaderboardHandler } from "../controllers/score";
import { mongooseScoreRepo } from "../repositories/mongoose/scoreRepo";
import { createScoreService } from "../services/score";

const router = express.Router();

const scoreService = createScoreService(mongooseScoreRepo);

router.get("/leaderboard", createGetLeaderboardHandler(scoreService));

export default router;
