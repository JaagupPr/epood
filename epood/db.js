const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATANAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME,
    dialect: "mariadb",
    logging: console.log,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Connection failed: " + error);
  }
})();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./models/product")(sequelize, DataTypes);
db.users = require("./models/user")(sequelize, DataTypes);
db.orders = require("./models/order")(sequelize, DataTypes);
db.reviews = require("./models/review")(sequelize, DataTypes);
db.orderitems = require("./models/orderitem")(sequelize, DataTypes);
db.productuser = require("./models/productuser")(sequelize, DataTypes);

db.users.hasMany(db.reviews, { foreignKey: "UserID" });
db.users.hasMany(db.orders, { foreignKey: "UserID" });
db.products.hasMany(db.reviews, { foreignKey: "ProductID" });
db.orders.hasMany(db.orderitems, { foreignKey: "OrderID" });
db.orderitems.belongsTo(db.products, { foreignKey: "ProductID" });
db.productuser.belongsTo(db.products, { foreignKey: "ProductID" });
db.productuser.belongsTo(db.users, { foreignKey: "UserID" });
db.products.hasMany(db.productuser, { foreignKey: "ProductID" });
db.users.hasMany(db.productuser, { foreignKey: "UserID" });

const sync = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Failed to sync models:", error);
  }
};

module.exports = { db, sync };
