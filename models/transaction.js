const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Transaction = sequelize.define('Transaction', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        valorTotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        metodoPagamento: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['credit-card', 'pix']],
            },
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pendente',
            validate: {
                isIn: [['pendente', 'concluido', 'falhado']],
            },
        },
    }, {
        tableName: 'Transactions',
        timestamps: true,
    });

    Transaction.associate = (models) => {
        Transaction.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return Transaction;
};
