const express = require('express');
const router = express.Router();
const { collectionController } = require('../controllers');
const upload = require('../middlewares/upload');
const imageProcessor = require('../utils/imageProcessor');

router.route('/')
  .get(collectionController.getAllCollections)
  .post(upload.single('image'), imageProcessor, collectionController.createCollection);

router.route('/:id')
  .get(collectionController.getCollection)
  .put(upload.single('image'), imageProcessor, collectionController.updateCollection)
  .delete(collectionController.deleteCollection);

module.exports = router;