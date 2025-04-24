import { Request, Response } from "express-serve-static-core";
import app from "../app";
import connectDB from "../config/database";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;

export default async function handler(req: Request, res: Response) {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }

  return app(req, res);
}
