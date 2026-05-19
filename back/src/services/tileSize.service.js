const { TileSize } = require('../models');

exports.createTileSize = async (data) => await TileSize.create(data);
exports.getAllTileSizes = async (filters) => await TileSize.find(filters);
exports.getTileSizeById = async (id) => await TileSize.findById(id);
exports.updateTileSize = async (id, data) => await TileSize.findByIdAndUpdate(id, data, { new: true });
exports.deleteTileSize = async (id) => await TileSize.findByIdAndDelete(id);
