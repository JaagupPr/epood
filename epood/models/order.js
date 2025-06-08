module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    OrderID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'UserID',
      }
    },
    OrderDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    TotalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    OrderStatus: {
      type: DataTypes.ENUM("Pending", "Shipped", "Completed", "Cancelled"),
      allowNull: false,
      defaultValue: "Pending",
    },
    ShippingAddress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    PaymentStatus: {
      type: DataTypes.ENUM("Paid", "Unpaid", "Pending"),
      allowNull: false,
      defaultValue: "Pending",
    },
  });

Order.associate = function (models) {
  Order.belongsTo(models.User, {
    foreignKey: 'UserID',
    onDelete: 'CASCADE',
  });
    User.hasMany(models.Order, {
    foreignKey: 'UserID',
    onDelete: 'CASCADE',
  });
    
  };

  return Order;
};
