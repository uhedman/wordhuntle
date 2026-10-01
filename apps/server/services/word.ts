import { puntuation } from "@wordhuntle/core/utils/wordUtils";

import { ScoreRepository, WordRepository } from "../repositories/interfaces";
import { UserNotFoundError, ValidationError } from "../utils/errors";
import { gameService } from "./game";

export type WordService = ReturnType<typeof createWordService>;

export const createWordService = (
	scoreRepo: ScoreRepository,
	wordRepo: WordRepository,
) => ({
	async addWords(userId: string | undefined, words: unknown) {
		if (!userId) {
			throw new UserNotFoundError("No autorizado");
		}

		if (!Array.isArray(words) || words.some((w) => typeof w !== "string")) {
			throw new ValidationError("Lista de palabras inválida");
		}

		// TODO: Implementar validación de palabras en el servidor:
		// 1. Verificar que pertenezcan a la lista de palabras del día (gameService.getToday().words).
		// 2. Verificar que cumplan con la longitud mínima (>= 4 caracteres).
		// 3. Evitar duplicados ya registrados por el usuario para la fecha actual.

		const now = new Date();
		const today = new Date(now.setHours(0, 0, 0, 0));

		const wordDocs = words.map((word) => ({
			userId,
			word,
			date: today,
		}));

		await wordRepo.insertMany(wordDocs);

		const pointsToAdd = words.reduce(
			(acc, word) => acc + puntuation(word.length),
			0,
		);

		const score = await scoreRepo.findByUserAndDate(userId, today);
		let totalPoints = pointsToAdd;

		if (score) {
			totalPoints += score.points;
		}

		const maxPoints = gameService.getMaxPoints();
		const newLevel = Math.floor(Math.sqrt(totalPoints / maxPoints) * 8);

		await scoreRepo.upsert(userId, today, totalPoints, newLevel);

		return { message: "Palabras guardadas correctamente" };
	},
});
