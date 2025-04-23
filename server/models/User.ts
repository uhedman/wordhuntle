import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  passwordHash: string;
  createdAt: Date;
  setPassword: (password: string) => Promise<void>;
  validatePassword: (password: string) => Promise<boolean>;
}

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
