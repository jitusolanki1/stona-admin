const factory = require('../utils/crudFactory');
const { ContactOfficeLocation } = require('../models');

exports.createContactOfficeLocation = factory.createOne(ContactOfficeLocation);
exports.getAllContactOfficeLocations = factory.getAll(ContactOfficeLocation);
exports.getContactOfficeLocation = factory.getOne(ContactOfficeLocation);
exports.updateContactOfficeLocation = factory.updateOne(ContactOfficeLocation);
exports.deleteContactOfficeLocation = factory.deleteOne(ContactOfficeLocation);