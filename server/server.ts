import express from "express";
import cors from "cors";
import connectDB from "./config/database";
import dotenv from "dotenv";
import gridRoutes from "./routes/grid";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando!");
});

app.use("/api", gridRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
