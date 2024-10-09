const Sequelize = require('sequelize');

module.exports = (sequelize) => {
    const Product = sequelize.define('Product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true, 
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false, 
        },
        descricao: {
            type: Sequelize.STRING, 
        },
        preco: {
            type: Sequelize.DECIMAL,
            allowNull: false, 
        },
        estoque: {
            type: Sequelize.INTEGER,
            allowNull: false, 
        }
    });

    
    Product.associate = (models) => {
        
        Product.belongsToMany(models.Cart, {
            through: 'CartProducts', 
            foreignKey: 'productId', 
        });
    };

    return Product; 
};
