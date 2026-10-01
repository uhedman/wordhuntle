import { LastGame } from "@/features/history/types";
import { api } from "@/shared/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLastData = createAsyncThunk<LastGame>(
	"game/lastData",
	async () => {
		const data = await api.getLastDataAPI();
		return data;
	},
);
