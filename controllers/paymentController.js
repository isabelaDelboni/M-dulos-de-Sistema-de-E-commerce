class PaymentController {
    constructor(PaymentService) {
        this.paymentService = PaymentService; //Armazena o serviço que cuida dos pagamentos
    }

    //Processa um pagamento
    async processPayment(req, res) {
        const { userId, metodoPagamento } = req.body; 

        try {
            const paymentDetails = { metodoPagamento }; 
            const newTransaction = await this.paymentService.processPayment(userId, paymentDetails); 
            res.status(201).json(newTransaction);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocorreu um erro ao processar o pagamento.' });
        }
    }

    // Encontra todas as transações
    async findAllTransactions(req, res) {
        try {
            const allTransactions = await this.paymentService.findAllTransactions(); 
            res.status(200).json(allTransactions); 
        } catch (error) {
            console.error(error); 
            res.status(500).json({ error: 'Ocorreu um erro ao localizar todas as transações.' }); 
        }
    }

    //Transações de um usuário específico
    async findTransactionsByUserId(req, res) {
        const { userId } = req.query;

        try {
            const transactions = await this.paymentService.findTransactionsByUserId(userId); 
            if (!transactions || transactions.length === 0) {
                return res.status(404).json({ error: 'Nenhuma transação encontrada para este usuário.' }); 
            }
            res.status(200).json(transactions);
        } catch (error) {
            console.error(error); 
            res.status(500).json({ error: 'Ocorreu um erro ao localizar as transações deste usuário.' });
        }
    }

    //Encontra uma transação pelo ID
    async findTransactionById(req, res) {
        const { id } = req.params;

        try {
            const transaction = await this.paymentService.findTransactionById(id); 
            if (!transaction) {
                return res.status(404).json({ error: 'Transação não encontrada.' }); 
            }
            res.status(200).json(transaction); 
        } catch (error) {
            console.error(error); 
            res.status(500).json({ error: 'Ocorreu um erro ao localizar a transação pelo ID.' }); 
        }
    }
}

module.exports = PaymentController;
