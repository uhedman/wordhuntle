import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../types/auth";

const secret = process.env.JWT_TOKEN || ""; // TODO

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
    const payload = jwt.verify(token, secret) as { id: string };
    req.user = { id: payload.id };
    next();
  } catch (error) {
    console.error("Token inválido:", error);
    res.status(401).json({ error: "Token inválido" });
    return;
  }
};

export default authMiddleware;
