require('dotenv').config();

const port = process.env.PORT || 3001;
const host = 'localhost';
const express = require('express');
const cors = require('cors');
const app = express();
const swaggerUI = require('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./docs/swagger.yaml');
const {sync} = require('./db');


app.use(cors());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`Server running. Documentation at <a href="http://${host}:${port}/docs">/docs</a>`);
})

require("./routes/productRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/orderRoutes")(app);
require("./routes/reviewRoutes")(app);
require("./routes/OrderItemRoutes")(app);


app.listen(port, async() => {
  if (process.env.SYNC === 'true') {
      await sync();
  }
  console.log(`Api on saadaval aadressil: http://${host}:${port}`);
});