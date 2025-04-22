import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/auth";

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

userSchema.methods.setPassword = async function (password: string) {
  this.passwordHash = await bcrypt.hash(password, 10);
};

userSchema.methods.validatePassword = function (password: string) {
  return bcrypt.compare(password, this.passwordHash);
};

export default model<IUser>("User", userSchema);
