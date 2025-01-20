const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
  const users = await db.users.findAll();
  res.send(users);
};

exports.create = async (req, res) => {
  const { FirstName, LastName, Email, PhoneNumber, Address, UserType, Password } = req.body;
  if (!FirstName || !LastName || !Email || !PhoneNumber || !Address || !UserType ||!Password) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  const newUser = await db.users.create({
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    Address,
    UserType,
    Password,
  });

  res.status(201)
    .location(`${Utils.getBaseURL(req)}/users/${newUser.UserID}`)
    .send(newUser);
};

exports.getById = async (req, res) => {
  const user = await db.users.findByPk(req.params.UserID);
  if (!user) return res.status(404).send({ error: "User not found" });
  res.send(user);
};

exports.editById = async (req, res) => {
  const user = await db.users.findByPk(req.params.UserID);
  if (!user) return res.status(404).send({ error: "User not found" });

  const { FirstName, LastName, Email, PhoneNumber, Address, UserType } = req.body;
  if (!FirstName || !LastName || !Email || !PhoneNumber || !Address || !UserType ||!Password) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  user.set({ FirstName, LastName, Email, PhoneNumber, Address, UserType, Password });
  await user.save();

  res.status(200)
     .location(`${Utils.getBaseURL(req)}/users/${user.UserID}`)
     .send(user);
};

exports.deleteById = async (req, res) => {
  const user = await db.users.findByPk(req.params.id);
  if (!user) return res.status(404).send({ error: "User not found" });
  await user.destroy();
  res.status(204).send();
};
