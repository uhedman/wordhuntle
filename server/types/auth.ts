import { Request } from "express";

export interface AuthBody {
  username: string;
  password: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export interface IUser extends Document {
  username: string;
  passwordHash: string;
  createdAt: Date;
}

export interface IScore extends Document {
  user: IUser;
  points: number;
  date: Date;
}
