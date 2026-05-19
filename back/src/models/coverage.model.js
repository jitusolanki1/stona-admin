const mongoose = require('mongoose');

const coverageSchema = new mongoose.Schema({
  outlet: { type: String, required: true },
  headline: { type: String, required: true },
  year: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Coverage', coverageSchema);