const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        items: {
            type: Sequelize.JSON,
            allowNull: false,
        },
    });

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, { foreignKey: 'userId' });
    };

    return Cart;
};
