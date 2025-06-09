module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    OrderItemID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    OrderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Orders',
        key: 'OrderID',
      },
    },
    ProductID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'ProductID',
      },
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  });

  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order, {
      foreignKey: {
        name: 'FK_OrderItem_OrderID',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });

    OrderItem.belongsTo(models.Product, {
      foreignKey: {
        name: 'FK_OrderItem_ProductID',
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };

  return OrderItem;
};
