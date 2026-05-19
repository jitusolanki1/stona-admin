const mongoose = require('mongoose');

const mediaAssetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String },
  size: { type: String },
  file: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('MediaAsset', mediaAssetSchema);