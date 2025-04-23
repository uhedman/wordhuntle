import { Response } from "express";
import Word from "../models/Word";
import Score from "../models/Score";
import { AuthenticatedRequest } from "../types/auth";
import { puntuation } from "../../shared/utils/wordUtils";
import { dailyGame } from "../services/game";

export const addWords = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;
  const { words } = req.body;

  if (!Array.isArray(words) || words.some((w) => typeof w !== "string")) {
    res.status(400).send("Lista de palabras inválida");
    return;
  }

  try {
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));

    const wordDocs = words.map((word) => ({
      user: userId,
      word,
      date: today,
    }));

    await Word.insertMany(wordDocs);

    const pointsToAdd = words.reduce(
      (acc, word) => acc + puntuation(word.length),
      0
    );

    let score = await Score.findOne({ user: userId, date: today });
    let totalPoints = pointsToAdd;

    if (score) {
      totalPoints += score.points;
    } else {
      score = new Score({ user: userId, date: today });
    }

    const maxPoints = dailyGame.getMaxPoints();
    const newLevel = Math.floor(Math.sqrt(totalPoints / maxPoints) * 8);

    await Score.findOneAndUpdate(
      { user: userId, date: today },
      { points: totalPoints, level: newLevel },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Palabras guardadas correctamente" });
  } catch (err) {
    console.error("Error al guardar palabras:", err);
    res.status(500).send("Error interno del servidor");
  }
};
