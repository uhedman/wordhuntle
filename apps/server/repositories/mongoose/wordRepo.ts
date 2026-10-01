import Word from "../../models/Word";
import { WordRepository } from "../interfaces";

export const mongooseWordRepo: WordRepository = {
	async findByUserAndDate(userId: string, date: Date): Promise<string[]> {
		const words = await Word.find({ user: userId, date });
		return words.map((w) => w.word);
	},

	async insertMany(
		entries: { userId: string; word: string; date: Date }[],
	): Promise<void> {
		const docs = entries.map((e) => ({
			user: e.userId,
			word: e.word,
			date: e.date,
		}));
		await Word.insertMany(docs);
	},
};
