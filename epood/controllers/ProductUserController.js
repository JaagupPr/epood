const { db } = require("../db");

exports.assignProduct = async (req, res) => {
  const { UserID, ProductID } = req.body;
  if (!UserID || !ProductID) return res.status(400).send({ error: "User ID and Product ID are required." });

  try {
    const userExists = await db.users.findByPk(UserID);
    const productExists = await db.products.findByPk(ProductID);
    if (!userExists || !productExists) return res.status(404).send({ error: "User or Product not found." });

    await db.productuser.create({ UserID, ProductID });
    res.status(201).send({ message: "Product assigned successfully." });
  } catch (error) {
    console.error("ASSIGN PRODUCT ERROR:", error);
    res.status(500).send({ error: "Assignment error." });
  }
};

exports.unassignProduct = async (req, res) => {
  const { UserID, ProductID } = req.body;
  if (!UserID || !ProductID) return res.status(400).send({ error: "User ID and Product ID are required." });

  try {
    const result = await db.productuser.destroy({ where: { UserID, ProductID } });
    res.status(result ? 200 : 404).send({ 
      message: result ? "Product unassigned successfully." : "Assignment not found." 
    });
  } catch (error) {
    console.error("UNASSIGN PRODUCT ERROR:", error);
    res.status(500).send({ error: "Unassignment error." });
  }
};