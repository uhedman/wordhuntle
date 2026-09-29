import cors from "cors";
import express from "express";

import authRoutes from "./routes/auth";
import gameRoutes from "./routes/game";
import scoreRoutes from "./routes/score";
import wordRoutes from "./routes/word";

const app = express();

app.get("/", (req, res) => {
	res.send("Backend funcionando!");
});

app.use(
	cors({
		origin:
			process.env.NODE_ENV === "production"
				? process.env.CLIENT_URL
				: "http://localhost:5173",
	}),
);
app.use(express.json());

// TODO: move to routes/index.ts
app.use("/api/game", gameRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/word", wordRoutes);

export default app;

// TODO: add helmet or similar security packages
// TODO: add logging middleware
