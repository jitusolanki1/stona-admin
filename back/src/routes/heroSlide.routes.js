const express = require('express');
const router = express.Router();
const { heroSlideController } = require('../controllers');
const upload = require('../middlewares/upload');
const imageProcessor = require('../utils/imageProcessor');

router.route('/')
  .get(heroSlideController.getAllHeroSlides)
  .post(upload.single('image'), imageProcessor, heroSlideController.createHeroSlide);

router.route('/:id')
  .get(heroSlideController.getHeroSlide)
  .put(upload.single('image'), imageProcessor, heroSlideController.updateHeroSlide)
  .delete(heroSlideController.deleteHeroSlide);

module.exports = router;
