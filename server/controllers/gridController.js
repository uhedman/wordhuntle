const { puntuation } = require("../utils/aux.js");
const getGrid = require("../utils/dailyGrid.js");
const getWords = require("../utils/dailyWords.js");

// Cálculo una sola vez al levantar el servidor
const todayCode = Math.floor(Date.now() / 86400000);
const lastCode = todayCode - 1;

const todayGrid = getGrid(todayCode);
const lastGrid = getGrid(lastCode);

const todayWords = getWords(todayGrid);
const maxPoints = todayWords.reduce((acc, word) => acc + puntuation(word.length), 0);
const lastWords = getWords(lastGrid);

// Handlers que simplemente devuelven las copias
const getTodayCode = (req, res) => {
  res.json({ code: todayCode });
};

const getTodayGrid = (req, res) => {
  res.json({ grid: todayGrid });
};

const getLastGrid = (req, res) => {
  res.json({ grid: lastGrid });
};

const getTodayWords = (req, res) => {
  res.json({ words: todayWords, maxPoints });
};

const getLastWords = (req, res) => {
  res.json({ words: lastWords });
};

module.exports = { getTodayCode, getTodayGrid, getLastGrid, getTodayWords, getLastWords };
