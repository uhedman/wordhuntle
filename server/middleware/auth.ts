import jwt from "jsonwebtoken";
import { RequestHandler } from "express";

const secret = process.env.JWT_SECRET || ""; // TODO

const authMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token no proporcionado" });
    return;
  }

  const token = authHeader.split(" ")[1];

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
