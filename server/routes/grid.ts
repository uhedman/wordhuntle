import express from "express";
import {
  getSeed,
  getTodayData,
  getLastData,
} from "../controllers/gridController";

const router = express.Router();

router.get("/seed", getSeed);
router.get("/todayData", getTodayData);
router.get("/lastData", getLastData);

export default router;
