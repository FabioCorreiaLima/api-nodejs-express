const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Rotas de Usuários
router.get('/login', userController.getLoginPage);
router.post('/login', userController.login);
router.post('/create', userController.createUser);
router.get('/all', userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;