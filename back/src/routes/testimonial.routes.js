const express = require('express');
const router = express.Router();
const { testimonialController } = require('../controllers');
const upload = require('../middlewares/upload');
const imageProcessor = require('../utils/imageProcessor');

router.route('/')
  .get(testimonialController.getAllTestimonials)
  .post(upload.single('avatar'), imageProcessor, testimonialController.createTestimonial);

router.route('/:id')
  .get(testimonialController.getTestimonial)
  .put(upload.single('avatar'), imageProcessor, testimonialController.updateTestimonial)
  .delete(testimonialController.deleteTestimonial);

module.exports = router;