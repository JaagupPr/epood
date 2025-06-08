module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    ProductID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ProductName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ProductPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    ProductDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ImageURL: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    ReleaseDateEU: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
  }, {
    timestamps: false,
  });

  return Product;
};
