const mongoose = require('mongoose');

const finishTypeSchema = new mongoose.Schema({
  name: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('FinishType', finishTypeSchema);
