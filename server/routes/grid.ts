import express from "express";
import {
  getTodayCode,
  getTodayGrid,
  getTodayWords,
  getLastGrid,
  getLastWords,
} from "../controllers/gridController";

const router = express.Router();

router.get("/todayCode", getTodayCode);
router.get("/todayGrid", getTodayGrid);
router.get("/todayWords", getTodayWords);
router.get("/lastGrid", getLastGrid);
router.get("/lastWords", getLastWords);

export default router;
