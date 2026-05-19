const { FinishType } = require('../models');

exports.createFinishType = async (data) => await FinishType.create(data);
exports.getAllFinishTypes = async (filters) => await FinishType.find(filters);
exports.getFinishTypeById = async (id) => await FinishType.findById(id);
exports.updateFinishType = async (id, data) => await FinishType.findByIdAndUpdate(id, data, { new: true });
exports.deleteFinishType = async (id) => await FinishType.findByIdAndDelete(id);
