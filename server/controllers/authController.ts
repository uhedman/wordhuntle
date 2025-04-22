import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";
import { AuthBody, AuthenticatedRequest } from "../types/auth";

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
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      res.status(401).send("Credenciales inválidas");
      return;
    }

    const accessToken = jwt.sign(
      { id: user._id, username: user.username },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id, username: user.username },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRATION }
    );

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ user: { username }, message: "Login exitoso" });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).send("Error interno del servidor");
  }
};

export const logout = (req: AuthenticatedRequest, res: Response) => {
  res
    .clearCookie("access_token")
    .clearCookie("refresh_token")
    .json({ message: "Logout exitoso" });
};

export const me = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(401).send("Usuario no encontrado");
      return;
    }

    res.json({
      message: "Usuario encontrado",
      user: { username: user.username },
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

  if (password.length < 4) {
    res.status(400).send("Datos inválidos");
    return;
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).send("Usuario ya existe");
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash });
    await newUser.save();

    const accessToken = jwt.sign(
      { id: newUser._id, username },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRATION,
      }
    );

    const refreshToken = jwt.sign(
      { id: newUser._id, username },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRATION,
      }
    );

    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({ message: "Usuario registrado con éxito", user: { username } });
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).send("Error interno del servidor");
  }
};

export const refresh = (req: Request, res: Response) => {
  const token = req.cookies.refresh_token;
  if (!token) {
    res.status(401).send("Refresh token no encontrado");
    return;
  }

  try {
    const payload = jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload;

    const newAccessToken = jwt.sign(
      { id: payload.id, username: payload.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRATION }
    );

    res
      .cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      })
      .json({ message: "Access token renovado" });
  } catch (err) {
    console.error("Error refrescando el token", err);
    res.status(403).send("Refresh token inválido");
  }
};
