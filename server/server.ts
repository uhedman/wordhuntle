import express from "express";
import cors from "cors";
import connectDB from "./config/database";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import gridRoutes from "./routes/grid";
import scoreRoutes from "./routes/score";
import wordRoutes from "./routes/word";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});

app.use("/api/grid", gridRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/word", wordRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
