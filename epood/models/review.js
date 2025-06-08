module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    'Review',
    {
      ReviewID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ProductID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UserID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      Rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 5,
          isInt: true,
        },   
      },
      Comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true
      },
    },

    }
  );

 Review.associate = function (models) {
  Review.belongsTo(models.Product, { foreignKey: 'ProductID' });
  Review.belongsTo(models.User, { foreignKey: 'UserID' });
};

  return Review;
};
