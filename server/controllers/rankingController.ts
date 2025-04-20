import { Request, Response } from "express";
import Score from "../models/Score";

// Helpers para fechas
function getStartOfWeek() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  return d;
}

export const getDailyRanking = async (req: Request, res: Response) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const scores = await Score.find({ date: today })
    .populate("user", "username")
    .sort({ score: -1 })
    .limit(10);
  res.json(scores);
};

export const getWeeklyRanking = async (req: Request, res: Response) => {
  const startOfWeek = getStartOfWeek();
  const scores = await Score.aggregate([
    { $match: { date: { $gte: startOfWeek } } },
    {
      $group: {
        _id: "$user",
        totalScore: { $sum: "$score" },
      },
    },
    { $sort: { totalScore: -1 } },
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
    { $project: { username: "$user.username", totalScore: 1 } },
  ]);

  res.json(scores);
};

export const getAllTimeRanking = async (req: Request, res: Response) => {
  const scores = await Score.aggregate([
    {
      $group: {
        _id: "$user",
        totalScore: { $sum: "$score" },
      },
    },
    { $sort: { totalScore: -1 } },
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
    { $project: { username: "$user.username", totalScore: 1 } },
  ]);

  res.json(scores);
};
