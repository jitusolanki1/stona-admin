const mongoose = require('mongoose');

const catalogueSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  pages: { type: Number },
  size: { type: String },
  cover: { type: String },
  type: { type: String },
  year: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Catalogue', catalogueSchema);