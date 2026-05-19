const express = require('express');
const router = express.Router();
const { homeApplicationAreaController } = require('../controllers');
const upload = require('../middlewares/upload');
const imageProcessor = require('../utils/imageProcessor');

router.route('/')
  .get(homeApplicationAreaController.getAllHomeApplicationAreas)
  .post(
    upload.single('image'),
    imageProcessor,
    homeApplicationAreaController.createHomeApplicationArea
  );

router.route('/:id')
  .get(homeApplicationAreaController.getHomeApplicationArea)
  .put(
    upload.single('image'),
    imageProcessor,
    homeApplicationAreaController.updateHomeApplicationArea
  )
  .delete(homeApplicationAreaController.deleteHomeApplicationArea);

module.exports = router;