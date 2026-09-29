import { Response } from "express";

import { WordService } from "../services/word";
import { AuthenticatedRequest } from "../types/auth";
import { CustomError } from "../utils/errors";

export const createAddWordsHandler =
	(wordService: WordService) =>
	async (req: AuthenticatedRequest, res: Response) => {
		try {
			const result = await wordService.addWords(
				req.user?.id,
				req.body.words,
			);
			res.status(200).json(result);
		} catch (err) {
			if (err instanceof CustomError) {
				res.status(err.statusCode).send(err.message);
			} else {
				console.error("Error al guardar palabras:", err);
				res.status(500).send("Error interno del servidor");
			}
		}
	};
