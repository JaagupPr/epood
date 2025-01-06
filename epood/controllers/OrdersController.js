const { db } = require("../db");

exports.getAllOrders = async (req, res) => {
  const orders = await db.orders.findAll();
  res.send(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await db.orders.findByPk(req.params.id);
  if (!order) return res.status(404).send({ error: "Order not found" });
  res.send(order);
};

exports.createOrder = async (req, res) => {
  const { BuyerID, OrderDate, TotalAmount, OrderStatus } = req.body;
  if (!BuyerID || !OrderDate || !TotalAmount || !OrderStatus) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  const newOrder = await db.orders.create({
    BuyerID,
    OrderDate,
    TotalAmount,
    OrderStatus,
  });
  res.status(201).send(newOrder);
};

exports.updateOrderById = async (req, res) => {
  const order = await db.orders.findByPk(req.params.id);
  if (!order) return res.status(404).send({ error: "Order not found" });

  const { BuyerID, OrderDate, TotalAmount, OrderStatus } = req.body;
  if (!BuyerID || !OrderDate || !TotalAmount || !OrderStatus) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  order.set({ BuyerID, OrderDate, TotalAmount, OrderStatus });
  await order.save();
  res.send(order);
};

exports.deleteOrderById = async (req, res) => {
  const order = await db.orders.findByPk(req.params.id);
  if (!order) return res.status(404).send({ error: "Order not found" });

  await order.destroy();
  res.status(204).send();
};
