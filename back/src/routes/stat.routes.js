const express = require('express');
const router = express.Router();
const { statController } = require('../controllers');

router.route('/')
  .get(statController.getAllStats)
  .post(statController.createStat);

router.route('/:id')
  .get(statController.getStat)
  .put(statController.updateStat)
  .delete(statController.deleteStat);

module.exports = router;