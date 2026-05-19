const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Space', spaceSchema);
