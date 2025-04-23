import express from "express";
import cors from "cors";
import connectDB from "./config/database";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import gameRoutes from "./routes/game";
import scoreRoutes from "./routes/score";
import wordRoutes from "./routes/word";
import path from "path";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/game", gameRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/word", wordRoutes);

app.use(express.static(path.join(__dirname, "../../../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../../client/dist/index.html"));
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
