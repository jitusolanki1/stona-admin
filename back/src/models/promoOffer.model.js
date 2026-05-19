const mongoose = require("mongoose");

const promoOfferSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    badge: { type: String },
    description: { type: String },
    ctaLabel: { type: String },
    ctaLink: { type: String },
    backgroundImage: { type: String },
    backgroundColor: { type: String },
    textColor: { type: String },
    accentColor: { type: String },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("PromoOffer", promoOfferSchema);
