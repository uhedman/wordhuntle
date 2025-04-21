import express from "express";
import { login, logout, me, register } from "../controllers/authController";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/me", authMiddleware, me);

router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.post("/register", register);

export default router;
