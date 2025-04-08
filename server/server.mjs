import express from 'express';
import cors from 'cors';
import connectDB from './config/database.mjs';
import dotenv from 'dotenv';
import gridRoutes from './routes/grid.mjs';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ejemplo de ruta
app.get('/', (req, res) => {
  res.send('Backend funcionando!');
});

app.use("/api", gridRoutes);

// Conexión a MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});