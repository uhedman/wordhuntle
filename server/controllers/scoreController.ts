import { RequestHandler } from "express";
import Score from "../models/Score";

export const submitScore: RequestHandler = async (req, res) => {
  const userId = req.user?.id;
  const { points } = req.body;

  if (!userId || typeof points !== "number") {
    res.status(400).json({ error: "Datos inválidos" });
    return;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const existingScore = await Score.findOne({ user: userId, date: today });

    if (existingScore) {
      if (points > existingScore.points) {
        existingScore.points = points;
        await existingScore.save();
      }
    } else {
      await Score.create({ user: userId, date: today, points });
    }

    res.status(200).json({ message: "Puntaje guardado con éxito" });
  } catch (error) {
    console.error("Error al guardar puntaje:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
