import { useEffect, useState } from "react";

import { Ranking } from "@/features/ranking/types";
import { api } from "@/shared/api";

export const useScores = () => {
	const [scores, setScores] = useState<Ranking>({
		daily: [],
		weekly: [],
		alltime: [],
	});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchScores = async () => {
			try {
				const data = await api.getLeaderboard();
				setScores(data);
			} catch (err) {
				console.error("Error al obtener scores:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchScores();
	}, []);

	return { scores, loading };
};
