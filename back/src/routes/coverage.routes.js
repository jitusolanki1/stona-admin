const express = require('express');
const router = express.Router();
const { coverageController } = require('../controllers');

router.route('/')
  .get(coverageController.getAllCoverages)
  .post(coverageController.createCoverage);

router.route('/:id')
  .get(coverageController.getCoverage)
  .put(coverageController.updateCoverage)
  .delete(coverageController.deleteCoverage);

module.exports = router;