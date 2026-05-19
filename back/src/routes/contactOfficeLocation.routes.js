const express = require('express');
const router = express.Router();
const { contactOfficeLocationController } = require('../controllers');

router.route('/')
  .get(contactOfficeLocationController.getAllContactOfficeLocations)
  .post(contactOfficeLocationController.createContactOfficeLocation);

router.route('/:id')
  .get(contactOfficeLocationController.getContactOfficeLocation)
  .put(contactOfficeLocationController.updateContactOfficeLocation)
  .delete(contactOfficeLocationController.deleteContactOfficeLocation);

module.exports = router;