const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
  const orders = await db.orders.findAll();
  res.send(orders);
};

exports.getById = async (req, res) => {
  const order = await db.orders.findByPk(req.params.id);
  if (!order) return res.status(404).send({ error: "Order not found" });
  res.send(order);
};

exports.create = async (req, res) => {
  const { UserID, OrderDate, TotalAmount, OrderStatus, ShippingAddress, PaymentStatus } = req.body;
  if (!UserID || !OrderDate || !TotalAmount || !OrderStatus || !ShippingAddress || !PaymentStatus) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  const newOrder = await db.orders.create({
    UserID,
    OrderDate,
    TotalAmount,
    OrderStatus,
    ShippingAddress,
    PaymentStatus
  });

  res.status(201)
     .location(`${Utils.getBaseURL(req)}/orders/${newOrder.OrderID}`)
     .send(newOrder);
};

exports.updateById = async (req, res) => {
  const order = await db.orders.findByPk(req.params.id);
  if (!order) return res.status(404).send({ error: "Order not found" });

  const { UserID, OrderDate, TotalAmount, OrderStatus, ShippingAddress, PaymentStatus } = req.body;
  if (!UserID || !OrderDate || !TotalAmount || !OrderStatus || !ShippingAddress || !PaymentStatus) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  order.set({ UserID, OrderDate, TotalAmount, OrderStatus, ShippingAddress, PaymentStatus });
  await order.save();

  res.status(200)
     .location(`${Utils.getBaseURL(req)}/orders/${order.OrderID}`)
     .send(order);
};

exports.deleteById = async (req, res) => {
  const order = await db.orders.findByPk(req.params.id);
  if (!order) return res.status(404).send({ error: "Order not found" });

  await order.destroy();
  res.status(204).send();
};
