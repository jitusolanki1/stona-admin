const factory = require('../utils/crudFactory');
const { MediaAsset } = require('../models');

exports.createMediaAsset = factory.createOne(MediaAsset);
exports.getAllMediaAssets = factory.getAll(MediaAsset);
exports.getMediaAsset = factory.getOne(MediaAsset);
exports.updateMediaAsset = factory.updateOne(MediaAsset);
exports.deleteMediaAsset = factory.deleteOne(MediaAsset);