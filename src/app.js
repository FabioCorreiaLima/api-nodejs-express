const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


// Conectar ao MongoDB    qBr7Np9iWWvKsxPU
mongoose.connect('mongodb+srv://gomu:lima@cluster0.tptdhgs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log("Conexão com o MongoDB estabelecida com sucesso");
  })
  .catch(error => {
    console.log("Erro ao conectar o MongoDB", error);
  });

app.use(express.json());
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});