class CartController {
    constructor(CartService) {
        this.cartService = CartService; //Salva a parte do serviço que cuida do carrinho
    }

    //Adiciona um produto à cesta de compras
    async addItem(req, res) {
        const { userId, productId, quantity } = req.body;

        try {
            const updatedCart = await this.cartService.addItem(userId, productId, quantity);
            res.status(200).json(updatedCart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //Remove um produto da cesta de compras
    async removeItem(req, res) {
        const { userId, productId } = req.params;

        try {
            const wasRemoved = await this.cartService.removeItem(userId, productId);
            if (!wasRemoved) {
                return res.status(404).json({ error: 'Cesta não encontrada ou item não removido.' });
            }
            res.status(200).json({ message: 'Produto removido da cesta com sucesso.' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    //Visualiza a cesta de um usuário
    async findCartByUserId(req, res) {
        const { userId } = req.params;

        try {
            const cart = await this.cartService.findCartByUserId(userId);
            if (!cart) {
                return res.status(404).json({ error: 'Cesta não encontrada.' });
            }
            res.status(200).json(cart);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CartController;
