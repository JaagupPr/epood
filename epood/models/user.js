module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    UserID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    FirstName: { type: DataTypes.STRING, allowNull: false },
    LastName: { type: DataTypes.STRING, allowNull: false },
    Email: { type: DataTypes.STRING, allowNull: false, unique: true },
    PhoneNumber: { type: DataTypes.STRING, allowNull: false },
    Address: { type: DataTypes.STRING, allowNull: false },
    UserType: { type: DataTypes.ENUM("Buyer", "Seller"), allowNull: false },
  });

  return User;
};
