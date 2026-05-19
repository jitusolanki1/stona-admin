const express = require('express');
const router = express.Router();
const { tileCalculatorConfigController } = require('../controllers');

router.route('/')
  .get(tileCalculatorConfigController.getAllTileCalculatorConfigs)
  .post(tileCalculatorConfigController.createTileCalculatorConfig);

router.route('/:id')
  .get(tileCalculatorConfigController.getTileCalculatorConfig)
  .put(tileCalculatorConfigController.updateTileCalculatorConfig)
  .delete(tileCalculatorConfigController.deleteTileCalculatorConfig);

module.exports = router;
