import express from "express";

import { getLastData, getSeed, getTodayData } from "../controllers/game";

const router = express.Router();

router.get("/seed", getSeed);
router.get("/todayData", getTodayData);
router.get("/lastData", getLastData);

export default router;
