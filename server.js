// Importando o app do arquivo app.js dentro do diretório src
import app from './src/app.js'

// Definindo a porta em que o servidor
const PORT = 3000

// Iniciando o servidor Express para escutar na porta especificada
app.listen(PORT, () => {
    // Exibindo uma mensagem no console quando o servidor estiver em execução
    console.log(`https://localhost${PORT}`)
})
