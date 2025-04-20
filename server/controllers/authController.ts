import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AuthBody } from "../types/auth";

const TOKEN_JWT = process.env.JWT_TOKEN || "";
const TOKEN_EXPIRATION = "7d";

export const login: RequestHandler<object, object, AuthBody> = async (
  req,
  res,
) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      res.status(401).json({ error: "Credenciales inválidas" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      TOKEN_JWT,
      {
        expiresIn: TOKEN_EXPIRATION,
      },
    );

    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      })
      .json({ token, username: user.username });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const register: RequestHandler<object, object, AuthBody> = async (
  req,
  res,
) => {
  const { username, password } = req.body;

  if (password.length < 4) {
    res.status(400).json({ error: "Datos inválidos" });
    return;
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      res.status(409).json({ error: "Usuario ya existe" });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash });
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (err) {
    console.error("Error en registro:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

export const logout: RequestHandler = (req, res) => {
  res
    .clearCookie('access_token')
    .json({ message: "Logout exitoso" });
};
