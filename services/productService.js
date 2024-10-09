const db = require('../models'); 

class ProductService {
    constructor(ProductModel) {
        this.Product = ProductModel;
    }

    //Criar um novo produto
    async create(nome, descricao, preco, estoque) {
        try {
            const newProduct = await this.Product.create({
                nome,
                descricao,
                preco,
                estoque
            });
            return newProduct || null; 
        } catch (error) {
            throw new Error(`Erro ao criar produto: ${error.message}`); 
        }
    }

    //Eetorna todos os produtos
    async findAll() {
        try {
            const allProducts = await this.Product.findAll(); 
            return allProducts.length ? allProducts : null; 
        } catch (error) {
            throw new Error(`Erro ao listar produtos: ${error.message}`); 
        }
    }

    //Retorna um produto pelo ID
    async findById(id) {
        try {
            const product = await this.Product.findByPk(id); 
            return product || null; 
        } catch (error) {
            throw new Error(`Erro ao encontrar produto pelo ID: ${error.message}`); 
        }
    }

    //Atualiza um produto
    async update(id, data) {
        try {
            const product = await this.Product.findByPk(id); 
            if (!product) {
                return null;
            }

            await product.update(data);
            return product; 
        } catch (error) {
            throw new Error(`Erro ao atualizar produto: ${error.message}`); 
        }
    }

    //Deleta um produto
    async delete(id) {
        try {
            const deletedRows = await this.Product.destroy({ where: { id } }); 
            return deletedRows > 0 ? deletedRows : null; 
        } catch (error) {
            throw new Error(`Erro ao deletar produto: ${error.message}`); 
        }
    }
}

module.exports = ProductService; 
