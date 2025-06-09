module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    UserID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    FirstName: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    LastName: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    Email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },
    PhoneNumber: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    Address: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    UserType: { 
      type: DataTypes.ENUM("Buyer", "Seller", "Admin"), 
      allowNull: false 
    },
    Password: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    SecureLevel: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    LevelKey: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '0-0'
    }
  });
  User.associate = function (models) {
  User.hasMany(models.Review, {
    foreignKey: 'UserID',
    onDelete: 'CASCADE',
  });

  User.hasMany(models.Order, {
    foreignKey: 'UserID',
    onDelete: 'CASCADE',
  });
};

  
  return User;
};
