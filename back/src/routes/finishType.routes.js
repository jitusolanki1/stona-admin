const express = require('express');
const router = express.Router();
const { finishTypeController } = require('../controllers');

router.route('/')
  .get(finishTypeController.getAllFinishTypes)
  .post(finishTypeController.createFinishType);

router.route('/:id')
  .get(finishTypeController.getFinishType)
  .put(finishTypeController.updateFinishType)
  .delete(finishTypeController.deleteFinishType);

module.exports = router;
