var express = require('express'); 
var router = express.Router(); 

const db = require('../models'); 

const UserService = require('../services/userService');
const UserController = require('../controllers/userController');

const userService = new UserService(db.User);
const userController = new UserController(userService);

router.get('/', (req, res) => {
    res.send('Módulo de usuários rodando.'); 
});

//Rota para login
router.post('/login', async (req, res) => {
    try {
        const user = await userController.login(req, res); 
        res.status(200).json(user); 
    } catch (error) {
        console.error('Erro no login:', error.message); 
        res.status(500).json({ message: 'Erro ao fazer login.' }); 
    }
});

//Rota para criar um novo usuário
router.post('/', async (req, res) => {
    try {
        const newUser = await userController.createUser(req, res); 
        res.status(201).json(newUser); 
    } catch (error) {
        console.error('Erro ao criar usuário:', error.message); 
        res.status(500).json({ message: 'Erro ao criar usuário.' }); 
    }
});

//Rota para retornar todos os usuários
router.get('/allusers', async (req, res) => {
    try {
        const users = await userController.findAllUsers(req, res); 
        res.status(200).json(users); 
    } catch (error) {
        console.error('Erro ao retornar todos os usuários:', error.message); 
        res.status(500).json({ message: 'Erro ao retornar todos os usuários.' }); 
    }
});

//Rota para retornar um usuário pelo ID
router.get('/getUserById/:id', async (req, res) => {
  try {
      await userController.findUserById(req, res);
  } catch (error) {
      console.error(`Erro ao processar a requisição: ${error}`);
      res.status(500).json({ error: 'Erro ao localizar o usuário.' });
  }
});

module.exports = router; 
