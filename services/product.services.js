const Product = require("../models/Product");

exports.getProductsService = async () => {
  const products = await Product.find();
  return products;
};

exports.createProductService = async (productData) => {
  const product = new Product(productData);
  const result = await product.save();
  return result;
};
