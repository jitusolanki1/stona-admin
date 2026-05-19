const express = require('express');
const router = express.Router();
const { tileSizeController } = require('../controllers');

router.route('/')
  .get(tileSizeController.getAllTileSizes)
  .post(tileSizeController.createTileSize);

router.route('/:id')
  .get(tileSizeController.getTileSize)
  .put(tileSizeController.updateTileSize)
  .delete(tileSizeController.deleteTileSize);

module.exports = router;
