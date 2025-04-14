import express from "express";
import {
  getTodayCode,
  getTodayData,
  getLastData,
} from "../controllers/gridController";

const router = express.Router();

router.get("/todayCode", getTodayCode);
router.get("/todayData", getTodayData);
router.get("/lastData", getLastData);

export default router;
