const User = require('../models/userModel');

// Lista todos os usuários
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar usuários.', erro: error.message });
  }
};

// Cria um novo usuário
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ mensagem: 'Usuário criado com sucesso.', usuario: savedUser });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao criar usuário.', erro: error.message });
  }
};

// Atualiza um usuário existente
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    res.status(200).json({ mensagem: 'Usuário atualizado com sucesso.', usuario: updatedUser });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao atualizar usuário.', erro: error.message });
  }
};

// Deleta um usuário existente
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ mensagem: 'Usuário deletado com sucesso.' });
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao deletar usuário.', erro: error.message });
  }
};


// Busca um usuário por ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ mensagem: 'Erro ao buscar usuário.', erro: error.message });
  }
};