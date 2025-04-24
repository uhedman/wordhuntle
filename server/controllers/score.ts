import { Request, Response } from "express";
import Score from "../models/Score";

function getStartOfWeek() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    // Daily
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const daily = await Score.aggregate([
      { $match: { date: { $gte: today } } },
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
