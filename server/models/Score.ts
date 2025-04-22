import mongoose from "mongoose";
import { IScore } from "../types/auth";

const { Schema, Types } = mongoose;

const scoreSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  points: { type: Number, required: true },
  date: { type: Date, default: () => new Date().setHours(0, 0, 0, 0) },
});

scoreSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model<IScore>("Score", scoreSchema);
