// Variáveis de ambiente
require('dotenv').config()

// Servidor e banco de dados
const express = require('express');
const mongoose = require('mongoose');

// Rotas
const routes = require('./routes');
const cors = require('cors');

// Inicializando API
const app = express();
app.use(cors())
app.use(express.json())
app.use(routes)

// Inializando banco de dados
mongoose.connect(
    process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true}
)

const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Conexão com o banco de dados bem sucedida!'))

// Ativa a API
app.listen(process.env.PORT, () =>{
    console.log("API aguardando solicitações...")
})