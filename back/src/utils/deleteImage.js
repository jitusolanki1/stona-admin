const fs = require("fs");
const path = require("path");

const deleteImage = (imagePath) => {
  if (!imagePath) return;

  const fullPath = path.join(__dirname, "..", imagePath);

  fs.unlink(fullPath, (err) => {
    if (err) console.log("Delete failed:", err.message);
  });
};

module.exports = deleteImage;
