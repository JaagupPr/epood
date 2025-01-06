const { db } = require("../db");

exports.getAllUsers = async (req, res) => {
  const users = await db.users.findAll();
  res.send(users);
};

exports.getUserById = async (req, res) => {
  const user = await db.users.findByPk(req.params.id);
  if (!user) return res.status(404).send({ error: "User not found" });
  res.send(user);
};

exports.createUser = async (req, res) => {
  const { FirstName, LastName, Email, PhoneNumber, Address, UserType } = req.body;
  if (!FirstName || !LastName || !Email || !PhoneNumber || !Address || !UserType) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  const newUser = await db.users.create({
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    Address,
    UserType,
  });
  res.status(201).send(newUser);
};

exports.updateUserById = async (req, res) => {
  const user = await db.users.findByPk(req.params.id);
  if (!user) return res.status(404).send({ error: "User not found" });

  const { FirstName, LastName, Email, PhoneNumber, Address, UserType } = req.body;
  if (!FirstName || !LastName || !Email || !PhoneNumber || !Address || !UserType) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  user.set({ FirstName, LastName, Email, PhoneNumber, Address, UserType });
  await user.save();
  res.send(user);
};

exports.deleteUserById = async (req, res) => {
  const user = await db.users.findByPk(req.params.id);
  if (!user) return res.status(404).send({ error: "User not found" });
  await user.destroy();
  res.status(204).send();
};
