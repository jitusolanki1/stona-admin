const mongoose = require("mongoose");

const adminAccountSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Admin" },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: { type: String, required: true },
    resetPasswordTokenHash: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true },
);

module.exports = mongoose.model("AdminAccount", adminAccountSchema);
