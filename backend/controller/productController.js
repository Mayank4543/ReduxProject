const Product = require("../models/productModel");
const ApiFeatures = require("../utils/apiFeature");
const ErrorHander = require("../utils/errorhandling");

exports.createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
};

exports.getAllProducts = async (req, res) => {
  const resultperpage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultperpage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
  });
};
exports.getProductDetails = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product: product,
  });
};

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return new Error("Product Not found");
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    });
    res.status(200).json({
      success: true,
      product: product,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      product: [],
    });
  }
};
// Delete Product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return new Error("Product not found");
    } else {
      await product.deleteOne({ _id: req.params.id });

      return res.status(200).json({
        success: true,
        message: "Product removed successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
