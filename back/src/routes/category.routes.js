const express = require('express');
const router = express.Router();
const { categoryController } = require('../controllers');
const upload = require('../middlewares/upload');
const imageProcessor = require('../utils/imageProcessor');

router.route('/')
  .get(categoryController.getAllCategories)
  .post(upload.single('image'), imageProcessor, categoryController.createCategory);

router.route('/:id')
  .get(categoryController.getCategory)
  .put(upload.single('image'), imageProcessor, categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;