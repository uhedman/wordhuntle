const express = require("express");
const {
  getTodayCode,
  getTodayGrid,
  getTodayWords,
  getLastGrid,
  getLastWords
} = require("../controllers/gridController.js");

const router = express.Router();

router.get("/todayCode", getTodayCode);
router.get("/todayGrid", getTodayGrid);
router.get("/todayWords", getTodayWords);
router.get("/lastGrid", getLastGrid);
router.get("/lastWords", getLastWords);

module.exports = router;