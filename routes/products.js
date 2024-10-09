const express = require('express');
const router = express.Router();
const db = require('../models');
const ProductService = require('../services/productService');
const ProductController = require('../controllers/productController');

const productService = new ProductService(db.Product);
const productController = new ProductController(productService); 

//Cria um novo produto
router.post('/', async (req, res) => {
    await productController.create(req, res); 
});

//Lista todos os produtos
router.get('/', async (req, res) => {
    await productController.findAllProducts(req, res); 
});

//Encontra um produto pelo ID
router.get('/:id', async (req, res) => {
    await productController.findProductById(req, res); 
});

//Atualiza um produto
router.put('/:id', async (req, res) => {
    await productController.updateProduct(req, res); 
});

//Deleta um produto
router.delete('/:id', async (req, res) => {
    await productController.deleteProduct(req, res); 
});

module.exports = router; 
