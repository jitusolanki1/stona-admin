const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Stat', statSchema);