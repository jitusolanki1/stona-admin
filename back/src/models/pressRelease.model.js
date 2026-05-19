const mongoose = require('mongoose');

const pressReleaseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String },
  date: { type: String },
  excerpt: { type: String },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PressRelease', pressReleaseSchema);