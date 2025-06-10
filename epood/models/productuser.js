module.exports = (sequelize, DataTypes) => {
  const ProductUser = sequelize.define('ProductUser', {
    ProductID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'ProductID'
      }
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'UserID'
      }
    }
  }, {
    timestamps: false,
    tableName: 'ProductUser',
    freezeTableName: true
  });

  return ProductUser;
};