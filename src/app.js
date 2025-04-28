//src/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./middlewares/logger');

// Importando as rotas
const usuarioRoutes = require('./routes/usuario');
const authRoutes = require('./routes/auth');
const casoRoutes = require('./routes/caso');

// Carregar variavel de ambiente
dotenv.config();

// Connect banco de dados
connectDB();

// Inicializando o app
const app = express();

// Importa e usa o Swagger
const setupSwagger = require("./config/swaggerConfig");
setupSwagger(app);

// Middleware
app.use(cors());
app.use(logger);

// Aumentar o limite para permitir imagens em base64
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Usando as rotas
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/casos', casoRoutes);

// Porta do servidor
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});