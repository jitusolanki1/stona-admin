const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  tagline: { type: String },
  description: { type: String },
  image: { type: String },
  productCount: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  year: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model('Collection', collectionSchema);