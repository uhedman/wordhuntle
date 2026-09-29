import { Request, Response } from "express";

import { AuthService } from "../services/auth";
import { AuthBody, AuthenticatedRequest } from "../types/auth";
import { CustomError } from "../utils/errors";

export const createLoginHandler =
	(authService: AuthService) =>
	async (req: Request<object, object, AuthBody>, res: Response) => {
		try {
			const result = await authService.login(
				req.body.username,
				req.body.password,
			);
			res.json(result);
		} catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				console.error("Error en login:", err);
				res.status(500).send("Error interno del servidor");
			}
		}
	};

export const createMeHandler =
	(authService: AuthService) =>
	async (req: AuthenticatedRequest, res: Response) => {
		try {
			const result = await authService.me(req.user?.id);
			res.json(result);
		} catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				console.error("Error buscando el id:", err);
				res.status(500).send("Error interno del servidor");
			}
		}
	};

export const createRegisterHandler =
	(authService: AuthService) =>
	async (req: Request<object, object, AuthBody>, res: Response) => {
		try {
			const result = await authService.register(req.body);
			res.status(201).json(result);
		} catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				console.error("Error en registro:", err);
				res.status(500).send("Error interno del servidor");
			}
		}
	};

export const createRefreshHandler =
	(authService: AuthService) => (req: Request, res: Response) => {
		try {
			const result = authService.refresh(req.body.refreshToken);
			res.json(result);
		} catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				console.error("Error refrescando el token", err);
				res.status(500).send("Error interno del servidor");
			}
		}
	};
