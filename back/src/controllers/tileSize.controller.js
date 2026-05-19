const factory = require('../utils/crudFactory');
const { TileSize } = require('../models');

exports.createTileSize = factory.createOne(TileSize);
exports.getAllTileSizes = factory.getAll(TileSize);
exports.getTileSize = factory.getOne(TileSize);
exports.updateTileSize = factory.updateOne(TileSize);
exports.deleteTileSize = factory.deleteOne(TileSize);
