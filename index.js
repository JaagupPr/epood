const port = 8080;
const app = require('express')();
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./docs/swagger.yaml');
var express = require('express');

const products = [
  {
    ProductId: 1,
    ProductName: "Macbook m4 max",
    ProductCategory: "Computer",
    ProductPrice: 3499,
    ProductStockQuantity: 1024,
    ReleaseDateEU: "11.01.2024",
  },
  {
    ProductId: 2,
    ProductName: "Iphone 16 pro max",
    ProductCategory: "Smartphone",
    ProductPrice: 1459,
    ProductStockQuantity: 2149,
    ReleaseDateEU: "09.10.2024",
  },
  {
    ProductId: 3,
    ProductName: "Samsung galaxy s21 fe",
    ProductCategory: "Smartphone",
    ProductPrice: 699,
    ProductStockQuantity: 4950,
    ReleaseDateEU: "01.11.2022",
  },
  {
    ProductId: 4,
    ProductName: "Hp Spectre x360 14",
    ProductCategory: "Computer",
    ProductPrice: 1399,
    ProductStockQuantity: 1000,
    ReleaseDateEU: "10.09.2021",
  },
];

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());

app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/products/:id", (req, res) => {
  if (typeof products[req.params.id - 1] === "undefined") {
    return res.status(404).send({ error: "Product not found" });
  }
  if (req.params.id == null) {
    return res.status(400).send({ error: "Invalid product ID" });
  }
  res.send(products[req.params.id - 1]);
});

app.post("/products", (req, res) => {
  if (
    !req.body.ProductName ||
    !req.body.ProductCategory ||
    !req.body.ProductPrice ||
    !req.body.ProductStockQuantity ||
    !req.body.ReleaseDateEU
  ) {
    return res.status(400).send({ error: "One or multiple parameters are missing" });
  }

  let product = {
    ProductId: products.length + 1,
    ProductName: req.body.ProductName,
    ProductCategory: req.body.ProductCategory,
    ProductPrice: req.body.ProductPrice,
    ProductStockQuantity: req.body.ProductStockQuantity,
    ReleaseDateEU: req.body.ReleaseDateEU,
  };

  products.push(product);
  res.status(201)
    .location(`${getBaseURL(req)}/products/${products.length}`)
    .send(product);
});

app.put("/products/:id", (req, res) => {
  if (req.params.id == null) {
    return res.status(400).send({ error: "Product not found" });
  }
  if (
    !req.body.ProductName ||
    !req.body.ProductCategory ||
    !req.body.ProductPrice ||
    !req.body.ProductStockQuantity ||
    !req.body.ReleaseDateEU
  ) {
    return res.status(400).send({ error: "One or multiple parameters are missing" });
  }

  let product = {
    ProductId: req.params.id,
    ProductName: req.body.ProductName,
    ProductCategory: req.body.ProductCategory,
    ProductPrice: req.body.ProductPrice,
    ProductStockQuantity: req.body.ProductStockQuantity,
    ReleaseDateEU: req.body.ReleaseDateEU,
  };

  products.splice(req.params.id - 1, 1, product);
  res.status(201)
    .location(`${getBaseURL(req)}/products/${req.params.id}`)
    .send(product);
})

app.delete('/products/:id', (req, res) => {
  if(typeof products[req.params.id - 1] === 'undefined') {
    return res.status(404).send({ error: 'Product not found' });
  }
products.splice(req.params.id - 1, 1);

res.status(204).send({error: "No Content"});

})

app.listen(port, () => {
  console.log(`Api on saadaval aadressil: http://localhost:${port}`);
});

function getBaseURL(req) {
  return (req.connection && req.connection.encrypted ? "https" : "http") + `://${req.headers.host}`;
}