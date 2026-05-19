const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    collectionName: { type: String },
    category: { type: String, required: true, index: true },
    categoryLabel: { type: String },
    series: { type: String },
    family: { type: String },
    slug: { type: String, required: true, unique: true },
    finish: { type: String },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    thickness: { type: String },
    material: { type: String },
    applications: [{ type: String }],
    price: { type: Number },
    description: { type: String },
    featured: { type: Boolean, default: false },
    isNewItem: { type: Boolean, default: false },
    tags: [{ type: String }],
    image: { type: String },
    image2: { type: String },
    gallery: [{ type: String }],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
