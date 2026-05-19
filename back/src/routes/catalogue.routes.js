const express = require('express');
const router = express.Router();
const { catalogueController } = require('../controllers');
const upload = require('../middlewares/upload');
const imageProcessor = require('../utils/imageProcessor');

router.route('/')
  .get(catalogueController.getAllCatalogues)
  .post(upload.single('cover'), imageProcessor, catalogueController.createCatalogue);

router.route('/:id')
  .get(catalogueController.getCatalogue)
  .put(upload.single('cover'), imageProcessor, catalogueController.updateCatalogue)
  .delete(catalogueController.deleteCatalogue);

module.exports = router;