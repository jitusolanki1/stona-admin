const { Product } = require('../models');

exports.createProduct = async (data) => await Product.create(data);
exports.getAllProducts = async (filters) => await Product.find(filters);
exports.getProductById = async (id) => await Product.findById(id);
exports.updateProduct = async (id, data) => await Product.findByIdAndUpdate(id, data, { new: true });
exports.deleteProduct = async (id) => await Product.findByIdAndDelete(id);