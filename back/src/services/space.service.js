const { Space } = require('../models');

exports.createSpace = async (data) => await Space.create(data);
exports.getAllSpaces = async (filters) => await Space.find(filters);
exports.getSpaceById = async (id) => await Space.findById(id);
exports.updateSpace = async (id, data) => await Space.findByIdAndUpdate(id, data, { new: true });
exports.deleteSpace = async (id) => await Space.findByIdAndDelete(id);
