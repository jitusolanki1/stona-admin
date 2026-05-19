const { Category } = require('../models');

exports.createCategory = async (data) => await Category.create(data);
exports.getAllCategories = async (filters) => await Category.find(filters);
exports.getCategoryById = async (id) => await Category.findById(id);
exports.updateCategory = async (id, data) => await Category.findByIdAndUpdate(id, data, { new: true });
exports.deleteCategory = async (id) => await Category.findByIdAndDelete(id);