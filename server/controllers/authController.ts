import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AuthBody, AuthenticatedRequest } from "../types/auth";

const TOKEN_JWT = process.env.JWT_TOKEN || "";
const TOKEN_EXPIRATION = "7d";

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

    const token = jwt.sign(
      { id: user._id, username: user.username },
      TOKEN_JWT,
      {
        expiresIn: TOKEN_EXPIRATION,
      }
    );

    res
      .cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      })
      .json({ user: { username }, message: "Login exitoso" });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).send("Error interno del servidor");
  }
};

export const logout = (req: AuthenticatedRequest, res: Response) => {
  res.clearCookie("access_token").json({ message: "Logout exitoso" });
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

    res
      .status(201)
      .json({ message: "Usuario registrado con éxito", user: { username } });
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).send("Error interno del servidor");
  }
};
