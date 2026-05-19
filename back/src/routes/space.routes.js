const express = require('express');
const router = express.Router();
const { spaceController } = require('../controllers');
const upload = require('../middlewares/upload');
const imageProcessor = require('../utils/imageProcessor');

router.route('/')
  .get(spaceController.getAllSpaces)
  .post(upload.single('image'), imageProcessor, spaceController.createSpace);

router.route('/:id')
  .get(spaceController.getSpace)
  .put(upload.single('image'), imageProcessor, spaceController.updateSpace)
  .delete(spaceController.deleteSpace);

module.exports = router;
