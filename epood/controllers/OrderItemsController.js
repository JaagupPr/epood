const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
  try {
    const orderItems = await db.orderitems.findAll();
    res.send(orderItems);
  } catch (err) {
    res.status(400).send({ error: "An error occurred while fetching order items." });
  }
};

exports.getById = async (req, res) => {
  const idNumber = parseInt(req.params.id);

  if (isNaN(idNumber)) {
    return res.status(400).send({ error: "Invalid order item ID." });
  }

  try {
    const orderItem = await db.orderitems.findByPk(idNumber);
    if (!orderItem) {
      return res.status(404).send({ error: "Order item not found." });
    }
    return res.status(200).send(orderItem);
  } catch (err) {
    return res.status(400).send({ error: "An error occurred while fetching the order item." });
  }
};

exports.create = async (req, res) => {
  const { OrderID, ProductID, Quantity, Price } = req.body;

  if (!OrderID || !ProductID || !Quantity || !Price) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  try {
    console.log(db.orderitems);
    const newOrderItem = await db.orderitems.create({
      OrderID,
      ProductID,
      Quantity,
      Price,
    });

    res.status(201)
      .location(`${Utils.getBaseURL(req)}/orderitems/${newOrderItem.OrderItemID}`)
      .send(newOrderItem);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "An error occurred while creating the order item.", details: err.message });
  }
};

exports.updateById = async (req, res) => {
  const { OrderID, ProductID, Quantity, Price } = req.body;

  if (!OrderID || !ProductID || !Quantity || !Price) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  try {
    const orderItem = await db.orderitems.findByPk(req.params.id);
    if (!orderItem) return res.status(404).send({ error: "Order item not found" });

    orderItem.set({ OrderID, ProductID, Quantity, Price });
    await orderItem.save();

    res.status(200)
      .location(`${Utils.getBaseURL(req)}/orderitems/${orderItem.OrderItemID}`)
      .send(orderItem);
  } catch (err) {
    res.status(400).send({ error: "An error occurred while updating the order item." });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const orderItem = await db.orderitems.findByPk(req.params.id);
    if (!orderItem) return res.status(404).send({ error: "Order item not found" });

    await orderItem.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(400).send({ error: "An error occurred while deleting the order item." });
  }
};