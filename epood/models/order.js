module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    OrderID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    BuyerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "Users", key: "UserID" },
    },
    OrderDate: { type: DataTypes.DATEONLY, allowNull: false },
    TotalAmount: { type: DataTypes.DECIMAL, allowNull: false },
    OrderStatus: {
      type: DataTypes.ENUM("Pending", "Completed"),
      allowNull: false,
    },
  });

  return Order;
};
