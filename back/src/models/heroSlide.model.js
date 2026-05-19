const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema({
  image: { type: String },
  ctaLink: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('HeroSlide', heroSlideSchema);
