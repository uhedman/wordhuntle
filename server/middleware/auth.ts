import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../types/auth";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).send("Token no proporcionado");
    return;
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    res.status(401).json({ message: "Invalid authorization format" });
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
