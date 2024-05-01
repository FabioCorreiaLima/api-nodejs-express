const express= require('express');
require('dotenv').config({ path:"src/.env" }); 
const userRoutes = require('./routes/userRoutes');
const ConnectMongoDB = require("./DB/database");
const bodyParser = require('body-parser')

//conectando ao banco de dados
ConnectMongoDB();


const path = require('path');
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Configurar o middleware para analisar o corpo das solicitações
app.use(express.json());

// Roteamento de usuários
app.use('/api/users', userRoutes);


module.exports = app;