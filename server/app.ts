import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
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
    origin: "https://uhedman.github.io",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/game", gameRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/word", wordRoutes);

export default app;
