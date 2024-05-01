const mongoose = require('mongoose');

function connect() {
    mongoose.connect(process.env.MONGODB_URI, {
    })
    .then(() => {
        console.log('Conectado ao banco de dados');
    })
    .catch((error) => {
        console.log('Erro ao conectar ao banco de dados', error);
    });
}

module.exports = connect;