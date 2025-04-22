import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../types/auth";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || ""; // TODO

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.access_token;

  if (!token) {
    res.status(401).send("Token no proporcionado");
    return;
  }

  try {
    const payload = jwt.verify(token, ACCESS_TOKEN_SECRET) as { id: string };
    req.user = { id: payload.id };
    next();
  } catch (error) {
    console.error("Token inválido:", error);
    res.status(401).json({ error: "Token inválido" });
    return;
  }
};

export default authMiddleware;
