const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

//Schema
const productSchema = new mongoose.Schema({
  name: String,
});

//Models
const Product = mongoose.model("product", productSchema);

//Routes
app.post("/api/v1/products", async (req, res) => {
  const product = new Product(req.body);
  const result = await product.save();
  res.send(result);
});

app.get("/api/v1/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

app.get("/", (req, res) => {
  res.send("Welcome to inventory management server");
});

module.exports = app;
