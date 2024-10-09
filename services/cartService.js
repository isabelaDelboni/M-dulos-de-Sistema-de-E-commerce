const Cart = require('../models/cart'); 
const Product = require('../models/product'); 

class CartService {
    constructor(CartModel, ProductModel) {
        this.Cart = CartModel; 
        this.Product = ProductModel; 
    }

    //Adiciona um item à cesta de compras
    async addItem(userId, productId, quantity) {
        try {
            const product = await this.Product.findByPk(productId);
            if (!product) {
                throw new Error('Produto não encontrado.');
            }

            let cart = await this.Cart.findOne({ where: { userId } });

            if (!cart) {
                cart = await this.Cart.create({ userId, items: [] });
            }

            const items = cart.items || [];
            const existingItem = items.find(item => item.productId === productId);

            if (existingItem) {
                existingItem.quantity += quantity; 
            } else {
                items.push({ productId, quantity }); 
            }

            cart.items = items; 
            await cart.save(); 
            return cart; 
        } catch (error) {
            throw new Error(`Erro ao adicionar item à cesta: ${error.message}`);
        }
    }

    //Remove um item da cesta
    async removeItem(userId, productId) {
        try {
            const cart = await this.Cart.findOne({ where: { userId } });
            if (!cart) {
                throw new Error('Cesta não encontrada.');
            }

            const initialLength = cart.items.length;

            cart.items = cart.items.filter(item => item.productId !== productId);
            await cart.save(); 

            return initialLength > cart.items.length; 
        } catch (error) {
            throw new Error(`Erro ao remover item da cesta: ${error.message}`);
        }
    }

    //Retorna todos os itens da cesta de um usuário
    async findCartByUserId(userId) {
        try {
            const cart = await this.Cart.findOne({ where: { userId } });
            if (!cart) {
                return null; 
            }
            return cart; 
        } catch (error) {
            throw new Error(`Erro ao encontrar a cesta do usuário: ${error.message}`);
        }
    }

    //Retorna todas as cestas
    async findAll() {
        try {
            const allCarts = await this.Cart.findAll();
            return allCarts;
        } catch (error) {
            throw new Error(`Erro ao listar todas as cestas: ${error.message}`);
        }
    }
}

module.exports = CartService;
