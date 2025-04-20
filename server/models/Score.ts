import mongoose from "mongoose";

const { Schema } = mongoose;

const scoreSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  points: { type: Number, required: true },
  date: { type: Date, default: () => new Date().setHours(0, 0, 0, 0) },
});

scoreSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model("Score", scoreSchema);
