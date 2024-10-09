const express = require('express');
const router = express.Router();

const userRoutes = require('./users');
const cartRoutes = require('./cart');
const paymentRoutes = require('./payment');
const productRoutes = require('./products');

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

router.use('/users', userRoutes);        // Rotas de usuário
router.use('/cart', cartRoutes);          // Rotas do carrinho de compras
router.use('/payment', paymentRoutes);     // Rotas de pagamento
router.use('/products', productRoutes);    // Rotas de produtos

module.exports = router;
