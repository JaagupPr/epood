const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
  const users = await db.users.findAll();
  res.send(users);
};exports.create = async (req, res) => {
  const {
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    Address,
    UserType,
    Password
  } = req.body;

  if (!FirstName || !LastName || !Email || !PhoneNumber || !Address || !UserType || !Password) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  const secureLevelMap = {
    Buyer: 0,
    Seller: 1,
    Admin: 99
  };

  const levelKeyMap = {
    Buyer: "0-0",
    Seller: "1-0",
    Admin: "99-99"
  };

  const SecureLevel = secureLevelMap[UserType] ?? 0;
  const LevelKey = levelKeyMap[UserType] ?? "0-0";

  try {
    const newUser = await db.users.create({
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      Address,
      UserType,
      Password,
      SecureLevel,
      LevelKey
    });

    res.status(201)
      .location(`${Utils.getBaseURL(req)}/users/${newUser.id}`)
      .send(newUser);

  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    console.error('User creation error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getById = async (req, res) => {
  const user = await db.users.findByPk(req.params.id);
  if (!user) return res.status(404).send({ error: "User not found" });
  res.send(user);
};

exports.editById = async (req, res) => {
  const user = await db.users.findByPk(req.params.id);
  if (!user) return res.status(404).send({ error: "User not found" });

  const { FirstName, LastName, Email, PhoneNumber, Address, UserType, Password } = req.body;
  if (!FirstName || !LastName || !Email || !PhoneNumber || !Address || !UserType || !Password) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  const secureLevelMap = {
    Buyer: 0,
    Seller: 1,
    Admin: 99
  };

  const levelKeyMap = {
    Buyer: "0-0",
    Seller: "1-0",
    Admin: "99-99"
  };

  user.set({
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    Address,
    UserType,
    Password,
    SecureLevel: secureLevelMap[UserType] ?? 0,
    LevelKey: levelKeyMap[UserType] ?? "0-0"
  });

  await user.save();
  res.status(200)
    .location(`${Utils.getBaseURL(req)}/users/${user.id}`)
    .send(user);
};

exports.deleteById = async (req, res) => {
  const user = await db.users.findByPk(req.params.id);
  if (!user) return res.status(404).send({ error: "User not found" });
  await user.destroy();
  res.status(204).send();
};
