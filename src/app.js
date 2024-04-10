// Importando o módulo Express
import express, { json } from 'express'

// Criando uma instância do Express
const app = express()

// Middleware para processar dados JSON
app.use(express.json())

// Array de seleções (exemplo de dados)
const selecoes = [
    { id: 1, selecao: 'Brasil', grupo: 'G' },
    { id: 2, selecao: 'Servia', grupo: 'G' },
    { id: 3, selecao: 'Camarões', grupo: 'G' },
    { id: 4, selecao: 'Argentina', grupo: 'G' }
]

// Função para buscar uma seleção por ID
function BuscarSelecaoPorId(id) {
    // Filtrando o array de seleções pelo ID fornecido
    return selecoes.filter(selecao => selecao.id == id)
}


function DeletarSelecaoPorIndex(id) {
    // Filtrando o array de seleções pelo ID fornecido
    return selecoes.findIndex(selecao => selecao.id == id)
}
// Rota para a página inicial
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Rota para buscar uma seleção pelo ID
app.get('/selecoes/:id', (req, res) => {
    // Chamando a função BuscarSelecaoPorId e enviando a resposta como JSON
    res.json(BuscarSelecaoPorId(req.params.id))
})

// Rota para listar todas as seleções
app.get('/selecoes', (req, res) => {
    // Enviando o array de seleções como resposta
    res.status(200).send(selecoes)
})

// Rota para cadastrar uma nova seleção
app.post('/selecoes', (req, res) => {
    // Adicionando a nova seleção ao array selecoes
    selecoes.push(req.body)
    // Respondendo com status 201 (Created) e uma mensagem
    res.status(201).send('Seleção cadastrada com sucesso!')
})

app.delete('/selecoes/delete/:id', (req, res) => {
    let index = DeletarSelecaoPorIndex (req.params.id)
    selecoes.splice(index,1)
    console.log(index)
})


// Exportando o app para uso em outros módulos
export default app
