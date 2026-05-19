const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');

const processImage = async (buffer) => {
  const filename = `${uuidv4()}.webp`;
  const uploadPath = path.join(__dirname, '..', '..', 'uploads');
  
  await fs.mkdir(uploadPath, { recursive: true });
  
  await sharp(buffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(path.join(uploadPath, filename));
    
  return `/uploads/${filename}`;
};

const imageProcessor = async (req, res, next) => {
  try {
    if (req.file) {
      req.body[req.file.fieldname] = await processImage(req.file.buffer);
    }
    
    if (req.files) {
      if (Array.isArray(req.files)) {
        const paths = await Promise.all(req.files.map(f => processImage(f.buffer)));
        req.body[req.files[0].fieldname] = paths;
      } else {
        const arrayFields = ['gallery', 'collectionPhilosophyImages', 'manufacturingGallery'];
        for (const field of Object.keys(req.files)) {
          const processed = await Promise.all(req.files[field].map(f => processImage(f.buffer)));
          if (req.files[field].length === 1 && !arrayFields.includes(field)) {
            req.body[field] = processed[0];
          } else {
            req.body[field] = req.body[field] ? [].concat(req.body[field], processed) : processed;
          }
        }
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = imageProcessor;