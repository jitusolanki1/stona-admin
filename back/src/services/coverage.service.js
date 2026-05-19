const { Coverage } = require('../models');

exports.createCoverage = async (data) => await Coverage.create(data);
exports.getAllCoverages = async (filters) => await Coverage.find(filters);
exports.getCoverageById = async (id) => await Coverage.findById(id);
exports.updateCoverage = async (id, data) => await Coverage.findByIdAndUpdate(id, data, { new: true });
exports.deleteCoverage = async (id) => await Coverage.findByIdAndDelete(id);