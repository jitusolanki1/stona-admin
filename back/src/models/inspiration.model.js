const mongoose = require("mongoose");

const inspirationSchema = new mongoose.Schema(
  {
    roomKey: { type: String, index: true },
    room: { type: String },
    title: { type: String },
    collectionName: { type: String },
    image: { type: String },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Inspiration", inspirationSchema);
