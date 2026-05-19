const express = require('express');
const router = express.Router();
const { productController } = require('../controllers');
const upload = require('../middlewares/upload');
const imageProcessor = require('../utils/imageProcessor');

router.route('/')
  .get(productController.getAllProducts)
  .post(
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
      { name: 'gallery', maxCount: 10 }
    ]),
    imageProcessor,
    productController.createProduct
  );

router.route('/:id')
  .get(productController.getProduct)
  .put(
    upload.fields([
      { name: 'image', maxCount: 1 },
      { name: 'image2', maxCount: 1 },
      { name: 'gallery', maxCount: 10 }
    ]),
    imageProcessor,
    productController.updateProduct
  )
  .delete(productController.deleteProduct);

module.exports = router;