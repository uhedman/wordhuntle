import { Schema, Types, model } from "mongoose";
import { IUser } from "./User";

export interface IScore extends Document {
  user: IUser;
  level: number;
  points: number;
  date: Date;
}

const scoreSchema = new Schema({
  user: { type: Types.ObjectId, ref: "User", required: true },
  level: { type: Number, required: true },
  points: { type: Number, required: true },
  date: { type: Date, default: () => new Date().setHours(0, 0, 0, 0) },
});

scoreSchema.index({ user: 1, date: 1 }, { unique: true });

export default model<IScore>("Score", scoreSchema);
