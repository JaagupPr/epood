const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
  try {
    const products = await db.products.findAll();
    if (!products || products.length === 0) {
      return res.status(404).send({ error: "Products not found" });
    }
    res.send(products);
  } catch (err) {
    res.status(400).send({ error: "An error occurred while fetching products." });
  }
};

exports.getById = async (req, res) => {
  const idNumber = parseInt(req.params.id);

  if (isNaN(idNumber)) {
    return res.status(400).send({ error: "Invalid product ID." });
  }

  try {
    const product = await db.products.findByPk(idNumber);
    if (!product) {
      return res.status(404).send({ error: "Product not found." });
    }
    return res.status(200).send(product);
  } catch (err) {
    return res.status(400).send({ error: "An error occurred while fetching the product." });
  }
};

exports.create = async (req, res) => {
  const { ProductName, ProductCategory, ProductPrice, ProductDescription, ImageURL,  ReleaseDateEU } = req.body;

  if (!ProductName || !ProductCategory || !ProductPrice || !ProductDescription || !ImageURL || !ReleaseDateEU) {
    return res.status(400).send({ error: "One or multiple parameters are missing" });
  }

  try {
    const newProduct = await db.products.create({
      ProductName,
      ProductCategory,
      ProductPrice,
      ProductDescription,
      ImageURL,
      ReleaseDateEU,
    });

    res.status(201)
      .location(`${Utils.getBaseURL(req)}/products/${newProduct.ProductID}`)
      .send(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).send({ error: "An error occurred while creating the product.", details: err.message });
  }
};


exports.editById = async (req, res) => {
  const { ProductName, ProductCategory, ProductPrice, ProductDescription, ImageURL, ReleaseDateEU } = req.body;

  if (!ProductName || !ProductCategory || !ProductPrice || !ProductDescription || !ImageURL || !ReleaseDateEU) {
    return res.status(400).send({ error: "One or multiple parameters are missing" });
  }

  try {
    const product = await getProduct(req, res);
    if (!product) return;

    product.ProductName = ProductName;
    product.ProductCategory = ProductCategory;
    product.ProductPrice = ProductPrice;
    product.ProductDescription = ProductDescription;
    product.ImageURL = ImageURL;
    product.ReleaseDateEU = ReleaseDateEU;


    await product.save();

    res.status(200)
      .location(`${Utils.getBaseURL(req)}/products/${product.ProductID}`)
      .send(product);
  } catch (err) {
    res.status(400).send({ error: "An error occurred while updating the product." });
  }
};

exports.deleteById = async (req, res) => {
  try {
    const product = await getProduct(req, res);
    if (!product) return;

    await product.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(400).send({ error: "An error occurred while deleting the product." });
  }
};



const getProduct = async (req, res) => {
  const idNumber = parseInt(req.params.id);
  if (isNaN(idNumber)) {
    res.status(400).send({ error: `Invalid product ID: ${req.params.id}` });
    return null;
  }

  try {
    const product = await db.products.findByPk(idNumber);
    if (!product) {
      res.status(404).send({ error: "Product not found." });
      return null;
    }
    return product;
  } catch (err) {
    res.status(400).send({ error: "An error occurred while fetching the product." });
    return null;
  }
};

