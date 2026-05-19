const mongoose = require('mongoose');

const roomPresetDimensionSchema = new mongoose.Schema({
  key: { type: String, required: true },
  length: { type: Number, required: true },
  width: { type: Number, required: true }
}, { _id: false });

const wastageOptionValueSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: Number, required: true }
}, { _id: false });

const tileFormatSchema = new mongoose.Schema({
  label: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true }
}, { _id: false });

const tileCalculatorConfigSchema = new mongoose.Schema({
  defaultBoxCoverage: { type: Number },
  roomPresetDimensions: [roomPresetDimensionSchema],
  wastageOptionValues: [wastageOptionValueSchema],
  tileFormats: [tileFormatSchema]
}, { timestamps: true });

module.exports = mongoose.model('TileCalculatorConfig', tileCalculatorConfigSchema);
