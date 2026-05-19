const mongoose = require('mongoose');

const pageHeroImageSchema = new mongoose.Schema({
  page: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PageHeroImage', pageHeroImageSchema);
