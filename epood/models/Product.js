module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      ProductID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ProductName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ReleaseDateEU: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      ProductStockQuantity: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        validate: {
          min: 0,
        },
      },
    },
    {
      timestamps: false,
    }
  );

  console.log(Product === sequelize.models.Product);

  return Product;
};
