import express from "express";
import { login, me, refresh, register } from "../controllers/auth";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.post("/me", authMiddleware, me);
router.post("/login", login);
router.post("/register", register);
router.post("/refresh", refresh);

export default router;
