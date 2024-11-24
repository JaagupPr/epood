const app = require('express')();
const port = 8080
const swaggerUI = require
('swagger-ui-express');
const swaggerDoc = require("./docs/swagger.json");

app.use("/docs", swaggerUI.serve,swaggerUI.setup(swaggerDoc));

app.get("/products", (req, res) => { res.send
  ( ['Macbook m4 max", "Iphone 16 pro max", "Samsung galaxy s21 fe", "Hp Spectre x360 14" ] )']
    /*[ 
    { Productid : 1, ProductName: "Macbook m4 max", ProductCategory: 'Computer', ProductPrice: 3499, ProductStockQuantity: 1024, ReleaseDateEU: "11.01.2024"},
    { Productid : 2, ProductName: "Iphone 16 pro max", ProductCategory: 'Smartphone', ProductPrice: 1459, ProductStockQuantity: 2149, ReleaseDateEU: "09.10.2024"},
    { Productid : 3, ProductName: "Samsung galaxy s21 fe", ProductCategory: 'Smartphone', ProductPrice: 699, ProductStockQuantity: 4950, ReleaseDateEU: "01.11.2022"},
    { Productid : 4, ProductName: "Hp Spectre x360 14", ProductCategory: 'Computer', ProductPrice: 1399, ProductStockQuantity: 1000, ReleaseDateEU: "10.09.2021"},
  ]*/)});

app.listen(port, () => {console.log(`Api on saadaval aadressil: http://localhost:${port}`);});