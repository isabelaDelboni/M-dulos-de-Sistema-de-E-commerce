const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./models');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const cartRouter = require('./routes/cart');
const paymentRouter = require('./routes/payment');
const productRouter = require('./routes/products');

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cart', cartRouter);
app.use('/payment', paymentRouter);
app.use('/products', productRouter);

//Sincronizando o Sequelize com o banco de dados
async function applyDataStructure() {
    try {
        await db.sequelize.sync({ alter: true });
        console.log('Banco de dados sincronizado');
    } catch (err) {
        console.error('Erro ao sincronizar o banco de dados:', err);
    }
}

applyDataStructure();

const port = 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

module.exports = app;
