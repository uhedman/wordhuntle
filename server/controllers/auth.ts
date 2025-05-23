import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import Word from "../models/Word";
import Score from "../models/Score";
import { AuthBody, AuthenticatedRequest } from "../types/auth";
import { validateAuthInput } from "../validators/authValidator";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || ""; // TODO
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || ""; // TODO
const ACCESS_TOKEN_EXPIRATION = "1h";
const REFRESH_TOKEN_EXPIRATION = "7d";

export const login = async (
  req: Request<object, object, AuthBody>,
  res: Response
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.validatePassword(password))) {
      res.status(401).send("Credenciales inválidas");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const score = await Score.findOne({
      user: user._id,
      date: today,
    });

    const words = await Word.find({
      user: user._id,
      date: today,
    });

    const accessToken = jwt.sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });

    const refreshToken = jwt.sign({ id: user._id }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });

    res.json({
      user: {
        username,
      },
      accessToken,
      refreshToken,
      message: "Login exitoso",
      progress: {
        found: words.map((wordDoc) => wordDoc.word),
        level: score?.level,
        points: score?.points,
      },
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).send("Error interno del servidor");
  }
};

export const me = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).send("Usuario no encontrado");
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const score = await Score.findOne({
      user: user._id,
      date: today,
    }).select("level points -_id");

    const words = await Word.find({
      user: user._id,
      date: today,
    });

    res.json({
      message: "Usuario encontrado",
      user: { username: user.username },
      progress: {
        found: words.map((wordDoc) => wordDoc.word),
        level: score?.level,
        points: score?.points,
      },
    });
  } catch (err) {
    console.error("Error buscando el id:", err);
    res.status(500).send("Error interno del servidor");
  }
};

export const register = async (
  req: Request<object, object, AuthBody>,
  res: Response
) => {
  const { username, password } = req.body;
  const validationError = validateAuthInput(username, password);

  if (validationError) {
    res.status(400).send(validationError);
    return;
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).send("Usuario ya existe");
      return;
    }

    const newUser = new User({ username });
    await newUser.setPassword(password);
    await newUser.save();

    const accessToken = jwt.sign({ id: newUser._id }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });

    const refreshToken = jwt.sign({ id: newUser._id }, REFRESH_TOKEN_SECRET, {
      expiresIn: REFRESH_TOKEN_EXPIRATION,
    });

    res.status(201).json({
      message: "Usuario registrado con éxito",
      user: {
        username,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).send("Error interno del servidor");
  }
};

export const refresh = (req: Request, res: Response) => {
  const token = req.body.refreshToken;
  if (!token) {
    res.status(401).send("Refresh token no encontrado");
    return;
  }

  try {
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as { id: string };

    const newAccessToken = jwt.sign({ id: payload.id }, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRATION,
    });

    res.json({
      message: "Access token renovado",
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.error("Error refrescando el token", err);
    res.status(403).send("Refresh token inválido");
  }
};
