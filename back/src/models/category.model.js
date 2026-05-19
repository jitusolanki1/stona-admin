const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  count: { type: Number, default: 0 },
  tagline: { type: String },
  application: { type: String },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);