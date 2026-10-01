import express from "express";

import {
	createLoginHandler,
	createMeHandler,
	createRefreshHandler,
	createRegisterHandler,
} from "../controllers/auth";
import authMiddleware from "../middleware/auth";
import { mongooseScoreRepo } from "../repositories/mongoose/scoreRepo";
import { mongooseUserRepo } from "../repositories/mongoose/userRepo";
import { mongooseWordRepo } from "../repositories/mongoose/wordRepo";
import { createAuthService } from "../services/auth";

const router = express.Router();

const authService = createAuthService(
	mongooseUserRepo,
	mongooseScoreRepo,
	mongooseWordRepo,
);

router.get("/me", authMiddleware, createMeHandler(authService));

router.post("/login", createLoginHandler(authService));
router.post("/register", createRegisterHandler(authService));
router.post("/refresh", createRefreshHandler(authService));

export default router;
