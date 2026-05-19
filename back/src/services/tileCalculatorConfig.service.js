const { TileCalculatorConfig } = require('../models');

exports.createTileCalculatorConfig = async (data) => await TileCalculatorConfig.create(data);
exports.getAllTileCalculatorConfigs = async (filters) => await TileCalculatorConfig.find(filters);
exports.getTileCalculatorConfigById = async (id) => await TileCalculatorConfig.findById(id);
exports.updateTileCalculatorConfig = async (id, data) => await TileCalculatorConfig.findByIdAndUpdate(id, data, { new: true });
exports.deleteTileCalculatorConfig = async (id) => await TileCalculatorConfig.findByIdAndDelete(id);
