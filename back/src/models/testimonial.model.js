const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  company: { type: String },
  quote: { type: String, required: true },
  avatar: { type: String },
  rating: { type: Number },
  project: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);