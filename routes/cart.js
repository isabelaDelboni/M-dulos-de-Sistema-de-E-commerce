const express = require('express');
const router = express.Router();
const db = require('../models');
const CartService = require('../services/cartService');
const CartController = require('../controllers/cartController');

const cartService = new CartService(db.Cart, db.Product);
const cartController = new CartController(cartService);

//Adiciona um produto à cesta
router.post('/add', (req, res) => {
    cartController.addItem(req, res);
});

//Remove um produto da cesta
router.delete('/remove/:userId/:productId', (req, res) => {
    cartController.removeItem(req, res);
});

//Visualiza a cesta de um usuário
router.get('/:userId', (req, res) => {
    cartController.findCartByUserId(req, res);
});

//Lista todas as cestas
router.get('/allcarts', async (req, res) => {
    try {
        const allCarts = await cartService.findAll();
        res.status(200).json(allCarts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
