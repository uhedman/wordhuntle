import { Request, Response } from "express";
import Score from "../models/Score";
import { AuthenticatedRequest } from "../types/auth";

function getStartOfWeek() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    // Daily
    const today = new Date().setHours(0, 0, 0, 0);
    const dailyDocs = await Score.find({ date: today })
      .populate("user", "username")
      .sort({ score: -1 })
      .limit(10)
      .lean();

    const daily = dailyDocs.map((entry) => ({
      points: entry.points,
      username: entry.user.username,
    }));

    // Weekly
    const startOfWeek = getStartOfWeek();
    const weekly = await Score.aggregate([
      { $match: { date: { $gte: startOfWeek } } },
      {
        $group: {
          _id: "$user",
          points: { $sum: "$points" },
        },
      },
      { $sort: { points: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $project: { _id: 0, username: "$user.username", points: 1 } },
    ]);

    // Alltime
    const alltime = await Score.aggregate([
      {
        $group: {
          _id: "$user",
          points: { $sum: "$points" },
        },
      },
      { $sort: { points: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      { $project: { _id: 0, username: "$user.username", points: 1 } },
    ]);

    res.json({ daily, weekly, alltime });
  } catch (err) {
    console.error("Error obteniendo leaderboard:", err);
    res.status(500).json({ error: "Error obteniendo leaderboard" });
  }
};

export const submitScore = async (req: AuthenticatedRequest, res: Response) => {
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
