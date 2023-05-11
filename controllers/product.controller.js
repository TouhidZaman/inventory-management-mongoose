const Product = require("../models/Product");

module.exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

module.exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const result = await product.save();
    result.logger();
    res.status(200).send({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Data not inserted",
      data: error.message,
    });
  }
};
