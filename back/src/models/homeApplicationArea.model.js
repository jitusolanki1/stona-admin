const mongoose = require('mongoose');

const homeApplicationAreaSchema = new mongoose.Schema({
  key: { type: String, required: true },
  nameKey: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('HomeApplicationArea', homeApplicationAreaSchema);