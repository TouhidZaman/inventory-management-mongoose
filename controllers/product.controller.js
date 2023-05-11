const productServices = require("../services/product.services");

exports.getProducts = async (req, res) => {
  const products = await productServices.getProductsService();
  res.send(products);
};

exports.createProduct = async (req, res) => {
  try {
    const result = await productServices.createProductService(req.body);
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
