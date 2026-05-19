const mongoose = require("mongoose");

const tileSizeSchema = new mongoose.Schema(
  {
    // Legacy field kept for backward compatibility with existing records.
    value: { type: String },
    productSlug: { type: String, required: true, index: true },
    productName: { type: String },
    category: { type: String, required: true, index: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    finish: { type: String },
    thickness: { type: String },
  },
  { timestamps: true },
);

tileSizeSchema.pre("validate", function syncLegacyValue(next) {
  if (!this.size && this.value) {
    this.size = this.value;
  }
  if (!this.value && this.size) {
    this.value = this.size;
  }
  next();
});

module.exports = mongoose.model("TileSize", tileSizeSchema);
