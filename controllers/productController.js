const ProductService = require('../services/productService');
const { Product } = require('../models');

class ProductController {
    constructor(productService) {
        this.productService = productService;
    }

    //Cria um novo produto
    async create(req, res) {
        try {
            const { nome, descricao, preco, estoque } = req.body; 
            const newProduct = await this.productService.create(nome, descricao, preco, estoque);
            res.status(201).json(newProduct); 
        } catch (error) {
            console.error('Erro ao criar produto:', error);
            res.status(500).json({ message: error.message });
        }
    }

    //Lista todos os produtos
    async findAllProducts(req, res) {
        try {
            const allProducts = await this.productService.findAll();
            res.status(200).json(allProducts); 
        } catch (error) {
            console.error(error); 
            res.status(500).json({ error: 'Ocorreu um erro ao localizar todos os produtos.' });
        }
    }

    //Encontra um produto pelo ID
    async findProductById(req, res) {
        const { id } = req.params;

        try {
            const product = await this.productService.findById(id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ error: 'Produto não encontrado.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocorreu um erro ao localizar o produto pelo ID.' });
        }
    }

    //Atualiza um produto
    async updateProduct(req, res) {
        const { id } = req.params;
        const { nome, descricao, preco, estoque } = req.body;

        try {
            const product = await this.productService.update(id, { nome, descricao, preco, estoque });
            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado.' }); 
            }

            res.status(200).json(product); 
        } catch (error) {
            console.error(error); 
            res.status(500).json({ error: 'Erro ao atualizar o produto.' }); 
        }
    }

    // Deleta um produto
    async deleteProduct(req, res) {
        const { id } = req.params; 

        try {
            const deletedProduct = await this.productService.delete(id);
            if (deletedProduct) {
                res.status(200).json({ message: 'Produto deletado com sucesso.' });
            } else {
                res.status(404).json({ error: 'Produto não encontrado para deleção.' }); 
            }
        } catch (error) {
            console.error(error); 
            res.status(500).json({ error: 'Ocorreu um erro ao deletar o produto.' }); 
        }
    }
}

module.exports = ProductController;
