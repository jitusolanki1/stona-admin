const { MediaAsset } = require('../models');

exports.createMediaAsset = async (data) => await MediaAsset.create(data);
exports.getAllMediaAssets = async (filters) => await MediaAsset.find(filters);
exports.getMediaAssetById = async (id) => await MediaAsset.findById(id);
exports.updateMediaAsset = async (id, data) => await MediaAsset.findByIdAndUpdate(id, data, { new: true });
exports.deleteMediaAsset = async (id) => await MediaAsset.findByIdAndDelete(id);