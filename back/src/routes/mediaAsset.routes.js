const express = require('express');
const router = express.Router();
const { mediaAssetController } = require('../controllers');
const upload = require('../middlewares/upload');
const imageProcessor = require('../utils/imageProcessor');

router.route('/')
  .get(mediaAssetController.getAllMediaAssets)
  .post(
    upload.single('file'),
    imageProcessor,
    mediaAssetController.createMediaAsset
  );

router.route('/:id')
  .get(mediaAssetController.getMediaAsset)
  .put(
    upload.single('file'),
    imageProcessor,
    mediaAssetController.updateMediaAsset
  )
  .delete(mediaAssetController.deleteMediaAsset);

module.exports = router;