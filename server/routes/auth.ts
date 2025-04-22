import express from "express";
import {
  login,
  logout,
  me,
  refresh,
  register,
} from "../controllers/authController";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.get("/me", authMiddleware, me);

router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.post("/register", register);
router.post("/refresh", refresh);

export default router;
