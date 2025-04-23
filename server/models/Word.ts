import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "./User";

export interface IWord extends Document {
  user: IUser;
  word: string;
  date: Date;
}

const WordSchema = new Schema<IWord>({
  user: { type: Types.ObjectId, ref: "User", required: true },
  word: { type: String, required: true },
  date: { type: Date, required: true },
});

export default mongoose.model<IWord>("Word", WordSchema);
