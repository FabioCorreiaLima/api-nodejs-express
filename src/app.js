// Importando o módulo Express
import express from 'express';

// Criando uma instância do Express
const app = express();

// Middleware para processar dados JSON
app.use(express.json());

// Array de seleções (exemplo de dados)
let selecoes = [
  { id: 1, selecao: 'Brasil', grupo: 'G' },
  { id: 2, selecao: 'Servia', grupo: 'G' },
  { id: 3, selecao: 'Camarões', grupo: 'G' },
  { id: 4, selecao: 'Argentina', grupo: 'G' }
];

// Função para buscar uma seleção por ID
function BuscarSelecaoPorId(id) {
  // Filtrando o array de seleções pelo ID fornecido
  return selecoes.find(selecao => selecao.id == id);
}

// Função para deletar uma seleção por ID
function DeletarSelecaoPorId(id) {
  // Encontrando o índice da seleção no array
  const index = selecoes.findIndex(selecao => selecao.id == id);
  if (index !== -1) {
    // Removendo a seleção do array
    selecoes.splice(index, 1);
    return true; // Indicando que a seleção foi removida com sucesso
  }
  return false; // Indicando que não foi encontrada uma seleção com o ID fornecido
}

// Rota para a página inicial
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Rota para buscar uma seleção pelo ID
app.get('/selecoes/:id', (req, res) => {
  // Chamando a função BuscarSelecaoPorId e enviando a resposta como JSON
  const selecao = BuscarSelecaoPorId(parseInt(req.params.id));
  if (selecao) {
    res.json(selecao);
  } else {
    res.status(404).send('Seleção não encontrada');
  }
});

// Rota para listar todas as seleções
app.get('/selecoes', (req, res) => {
  // Enviando o array de seleções como resposta
  res.status(200).json(selecoes);
});

// Rota para cadastrar uma nova seleção
app.post('/selecoes', (req, res) => {
  // Adicionando a nova seleção ao array selecoes
  selecoes.push(req.body);
  // Respondendo com status 201 (Created) e uma mensagem
  res.status(201).send('Seleção cadastrada com sucesso!');
});

// Rota para deletar uma seleção pelo ID
app.delete('/selecoes/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const deletado = DeletarSelecaoPorId(id);
    if (deletado) {
      res.status(200).json(selecoes);
    } else {
      res.status(404).send('Seleção não encontrada');
    }
  });
  

// Exportando o app para uso em outros módulos
export default app;
