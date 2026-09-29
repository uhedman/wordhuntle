import express from "express";

import { createAddWordsHandler } from "../controllers/word";
import authMiddleware from "../middleware/auth";
import { mongooseScoreRepo } from "../repositories/mongoose/scoreRepo";
import { mongooseWordRepo } from "../repositories/mongoose/wordRepo";
import { createWordService } from "../services/word";

const router = express.Router();

const wordService = createWordService(mongooseScoreRepo, mongooseWordRepo);

router.post("/", authMiddleware, createAddWordsHandler(wordService));

export default router;
