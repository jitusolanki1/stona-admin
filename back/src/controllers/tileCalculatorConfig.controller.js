const factory = require('../utils/crudFactory');
const { TileCalculatorConfig } = require('../models');

exports.createTileCalculatorConfig = factory.createOne(TileCalculatorConfig);
exports.getAllTileCalculatorConfigs = factory.getAll(TileCalculatorConfig);
exports.getTileCalculatorConfig = factory.getOne(TileCalculatorConfig);
exports.updateTileCalculatorConfig = factory.updateOne(TileCalculatorConfig);
exports.deleteTileCalculatorConfig = factory.deleteOne(TileCalculatorConfig);
