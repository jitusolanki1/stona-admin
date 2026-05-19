const express = require('express');
const router = express.Router();
const { pressReleaseController } = require('../controllers');
const upload = require('../middlewares/upload');
const imageProcessor = require('../utils/imageProcessor');

router.route('/')
  .get(pressReleaseController.getAllPressReleases)
  .post(
    upload.single('image'),
    imageProcessor,
    pressReleaseController.createPressRelease
  );

router.route('/:id')
  .get(pressReleaseController.getPressRelease)
  .put(
    upload.single('image'),
    imageProcessor,
    pressReleaseController.updatePressRelease
  )
  .delete(pressReleaseController.deletePressRelease);

module.exports = router;