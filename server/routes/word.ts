import express from "express";
import { addWords } from "../controllers/word";
import authMiddleware from "../middleware/auth";

const router = express.Router();

router.post("/", authMiddleware, addWords);

export default router;
