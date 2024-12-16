const port = 8080; 
const app = require('express')();
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./docs/swagger.yaml');
const express = require('express');

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());

// PRODUCTS
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

app.get("/products", (req, res) => {
  res.send(products);
});

app.get("/products/:id", (req, res) => {
  if (typeof products[req.params.id - 1] === "undefined") {
    return res.status(404).send({ error: "Product not found" });
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
  if (typeof products[req.params.id - 1] === "undefined") {
    return res.status(404).send({ error: "Product not found" });
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
    ProductId: parseInt(req.params.id),
    ProductName: req.body.ProductName,
    ProductCategory: req.body.ProductCategory,
    ProductPrice: req.body.ProductPrice,
    ProductStockQuantity: req.body.ProductStockQuantity,
    ReleaseDateEU: req.body.ReleaseDateEU,
  };

  products.splice(req.params.id - 1, 1, product);
  res.status(200).send(product);
});

app.delete('/products/:id', (req, res) => {
  if (typeof products[req.params.id - 1] === 'undefined') {
    return res.status(404).send({ error: 'Product not found' });
  }
  products.splice(req.params.id - 1, 1);
  res.status(204).send();
});

// USERS
const users = [
  {
    UserID: 1,
    FirstName: "Gordon",
    LastName: "Freeman",
    Email: "Gordon.Freeman@gmail.com",
    PhoneNumber: "+37212345678",
    Address: "Seattle, Washington, USA",
    UserType: "Buyer",
    SecureLevel: 0,
    LevelKey: "0-1"
  },
  {
    UserID: 2,
    FirstName: "David",
    LastName: "Attenborough",
    Email: "David.Attenborough@gmail.com",
    PhoneNumber: "+37287654321",
    Address: "5 Park Road, Richmond, Surrey, TW10 6NS, United Kingdom",
    UserType: "Seller",
    SecureLevel: 0,
    LevelKey: "0-0"
  },
  {
    UserID: 3,
    FirstName: "Elon",
    LastName: "Musk",
    Email: "Elon.Musk@gmail.com",
    PhoneNumber: "+99287654321",
    Address: "1 Rocket Road, Hawthorne, CA 90250, USA",
    UserType: "Seller",
    SecureLevel: 0,
    LevelKey: "0-1"
  },
  {
    UserID: 4,
    FirstName: "Mark",
    LastName: "Zuckerberg",
    Email: "Mark.Zuckerberg@gmail.com",
    PhoneNumber: "+44777123234",
    Address: "Palo Alto, California, USA",
    UserType: "Seller",
    SecureLevel: 0,
    LevelKey: "1-0"
  },
];

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.UserID == req.params.id);
  if (!user) {
    return res.status(404).send({ error: "User not found" });
  }
  res.send(user);
});

app.post("/users", (req, res) => {
  const { FirstName, LastName, Email, PhoneNumber, Address, UserType } = req.body;
  if (!FirstName || !LastName || !Email || !PhoneNumber || !Address || !UserType) {
    return res.status(400).send({ error: "One or more fields are missing" });
  }
  const newUser = {
    UserID: users.length + 1,
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    Address,
    UserType,
  };
  users.push(newUser);
  res.status(201).send(newUser);
});

app.put("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.UserID == req.params.id);
  if (userIndex === -1) {
    return res.status(404).send({ error: "User not found" });
  }
  const { FirstName, LastName, Email, PhoneNumber, Address, UserType } = req.body;
  if (!FirstName || !LastName || !Email || !PhoneNumber || !Address || !UserType) {
    return res.status(400).send({ error: "One or more fields are missing" });
  }
  users[userIndex] = {
    UserID: parseInt(req.params.id),
    FirstName,
    LastName,
    Email,
    PhoneNumber,
    Address,
    UserType,
  };
  res.send(users[userIndex]);
});

app.delete("/users/:id", (req, res) => {
  const userIndex = users.findIndex((u) => u.UserID == req.params.id);
  if (userIndex === -1) {
    return res.status(404).send({ error: "User not found" });
  }
  users.splice(userIndex, 1);
  res.status(204).send();
});

// ORDERS
const orders = [
  {
    OrderID: 1,
    BuyerID: 1,
    OrderDate: "2024-12-10",
    TotalAmount: 1459,
    OrderStatus: "Completed",
  },
  {
    OrderID: 2,
    BuyerID: 2,
    OrderDate: "2024-12-12",
    TotalAmount: 2534,
    OrderStatus: "Pending",
  },
  {
    OrderID: 3,
    BuyerID: 3,
    OrderDate: "2024-02-10",
    TotalAmount: 5321,
    OrderStatus: "Pending",
  },
  {
    OrderID: 4,
    BuyerID: 4,
    OrderDate: "2024-01-09",
    TotalAmount: 3245,
    OrderStatus: "Completed",
  },
];

app.get("/orders", (req, res) => {
  res.send(orders);
});

app.get("/orders/:id", (req, res) => {
  const order = orders.find((o) => o.OrderID == req.params.id);
  if (!order) {
    return res.status(404).send({ error: "Order not found" });
  }
  res.send(order);
});

app.post("/orders", (req, res) => {
  const { BuyerID, OrderDate, TotalAmount, OrderStatus } = req.body;
  if (!BuyerID || !OrderDate || !TotalAmount || !OrderStatus) {
    return res.status(400).send({ error: "One or more fields are missing" });
  }
  const newOrder = {
    OrderID: orders.length + 1,
    BuyerID,
    OrderDate,
    TotalAmount,
    OrderStatus,
  };
  orders.push(newOrder);
  res.status(201).send(newOrder);
});

app.put("/orders/:id", (req, res) => {
  const orderIndex = orders.findIndex((o) => o.OrderID == req.params.id);
  if (orderIndex === -1) {
    return res.status(404).send({ error: "Order not found" });
  }
  const { BuyerID, OrderDate, TotalAmount, OrderStatus } = req.body;
  if (!BuyerID || !OrderDate || !TotalAmount || !OrderStatus) {
    return res.status(400).send({ error: "One or more fields are missing" });
  }
  orders[orderIndex] = {
    OrderID: parseInt(req.params.id),
    BuyerID,
    OrderDate,
    TotalAmount,
    OrderStatus,
  };
  res.send(orders[orderIndex]);
});

app.delete("/orders/:id", (req, res) => {
  const orderIndex = orders.findIndex((o) => o.OrderID == req.params.id);
  if (orderIndex === -1) {
    return res.status(404).send({ error: "Order not found" });
  }
  orders.splice(orderIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});

function getBaseURL(req) {
  return (req.connection && req.connection.encrypted ? "https" : "http") + `://${req.headers.host}`;
}
