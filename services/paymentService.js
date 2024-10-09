class PaymentService {
    constructor(TransactionModel, CartModel) {
        this.Transaction = TransactionModel;
        this.Cart = CartModel;
    }

    //Processa o pagamento
    async processPayment(userId, paymentDetails) {
        try {
            const userCart = await this.Cart.findOne({ where: { userId } });
            if (!userCart) {
                throw new Error('Carrinho não encontrado para este usuário.');
            }

            const valorTotal = userCart.totalAmount; 

            const newTransaction = await this.Transaction.create({
                userId,
                valorTotal,
                metodoPagamento: paymentDetails.metodoPagamento,
                status: 'pendente'
            });

            
            newTransaction.status = 'concluída';
            await newTransaction.save();

            return newTransaction;
        } catch (error) {
            throw new Error(`Erro ao processar pagamento: ${error.message}`);
        }
    }

    //Procura a transação
    async findAllTransactions() {
        try {
            const allTransactions = await this.Transaction.findAll();
            return allTransactions;
        } catch (error) {
            throw new Error(`Erro ao listar transações: ${error.message}`);
        }
    }

    //Procura a transação pelo Id do Usuário
    async findTransactionsByUserId(userId) {
        try {
            const transactions = await this.Transaction.findAll({ where: { userId } });
            return transactions.length ? transactions : null;
        } catch (error) {
            throw new Error(`Erro ao encontrar transações para o usuário: ${error.message}`);
        }
    }

    //Procura a transação pelo Id
    async findTransactionById(id) {
        try {
            const transaction = await this.Transaction.findByPk(id);
            return transaction || null;
        } catch (error) {
            throw new Error(`Erro ao encontrar a transação pelo ID: ${error.message}`);
        }
    }
}

module.exports = PaymentService;
