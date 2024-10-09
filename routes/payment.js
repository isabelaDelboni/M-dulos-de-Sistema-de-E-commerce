const express = require('express');
const router = express.Router();
const db = require('../models');
const PaymentService = require('../services/paymentService');
const PaymentController = require('../controllers/paymentController');

const paymentService = new PaymentService(db.Transaction, db.Cart);
const paymentController = new PaymentController(paymentService);

router.get('/', (req, res) => {
    res.send('Módulo de pagamentos rodando.');
});

//Processa um pagamento com cartão de crédito
router.post('/creditcard', async (req, res) => {
    try {
        await paymentController.processPayment(req, res);
    } catch (error) {
        console.error('Erro no pagamento com cartão de crédito:', error.message);
        res.status(500).json({ error: 'Erro ao processar pagamento com cartão de crédito.' });
    }
});

//Processa um pagamento via PIX
router.post('/pix', async (req, res) => {
    try {
        await paymentController.processPayment(req, res);
    } catch (error) {
        console.error('Erro no pagamento via PIX:', error.message);
        res.status(500).json({ error: 'Erro ao processar pagamento via PIX.' });
    }
});

//Obtem o status de um pagamento
router.get('/status/:id', async (req, res) => {
    try {
        await paymentController.findTransactionById(req, res);
    } catch (error) {
        console.error('Erro ao obter o status do pagamento:', error.message);
        res.status(500).json({ error: 'Erro ao obter o status do pagamento.' });
    }
});

module.exports = router;
