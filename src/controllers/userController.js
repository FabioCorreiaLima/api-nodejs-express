const User = require("../models/user"); 
const bcrypt = require('bcrypt');


exports.getLoginPage = async (req, res) => {
    res.render('login'); 
}



exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ mensagem: 'Erro ao buscar usuários.', erro: error.message });
  }
};


exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// userController.js

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        // Login successful, send JSON response
        res.status(200).json({ message: "Login successful" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;
        const updates = {};
        if (email) updates.email = email;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updates.password = hashedPassword;
        }

        // Atualize os dados do usuário incluindo a senha criptografada, se fornecida
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted", deletedUser });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

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
