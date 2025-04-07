const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const gridRoutes = require('./routes/grid');

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