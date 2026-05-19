const express = require('express');
const router = express.Router();
const { pageHeroImageController } = require('../controllers');
const upload = require('../middlewares/upload');
const imageProcessor = require('../utils/imageProcessor');

router.route('/')
  .get(pageHeroImageController.getAllPageHeroImages)
  .post(upload.single('image'), imageProcessor, pageHeroImageController.createPageHeroImage);

router.route('/:id')
  .get(pageHeroImageController.getPageHeroImage)
  .put(upload.single('image'), imageProcessor, pageHeroImageController.updatePageHeroImage)
  .delete(pageHeroImageController.deletePageHeroImage);

module.exports = router;
