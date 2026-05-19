const mongoose = require('mongoose');

const contactOfficeLocationSchema = new mongoose.Schema({
  city: { type: String, required: true },
  address: { type: String },
  phone: { type: String },
  email: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ContactOfficeLocation', contactOfficeLocationSchema);