const express = require("express");
const app = express();
const cors = require("cors");
const productRouter = require("./routes/product.route");

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to inventory management server");
});

//Routes
app.use("/api/v1/products", productRouter);

module.exports = app;
