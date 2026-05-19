const express = require('express');
const router = express.Router();
const { inspirationController } = require('../controllers');
const upload = require('../middlewares/upload');
const imageProcessor = require('../utils/imageProcessor');

router.route('/')
  .get(inspirationController.getAllInspirations)
  .post(upload.single('image'), imageProcessor, inspirationController.createInspiration);

router.route('/:id')
  .get(inspirationController.getInspiration)
  .put(upload.single('image'), imageProcessor, inspirationController.updateInspiration)
  .delete(inspirationController.deleteInspiration);

module.exports = router;