const { ContactOfficeLocation } = require('../models');

exports.createContactOfficeLocation = async (data) => await ContactOfficeLocation.create(data);
exports.getAllContactOfficeLocations = async (filters) => await ContactOfficeLocation.find(filters);
exports.getContactOfficeLocationById = async (id) => await ContactOfficeLocation.findById(id);
exports.updateContactOfficeLocation = async (id, data) => await ContactOfficeLocation.findByIdAndUpdate(id, data, { new: true });
exports.deleteContactOfficeLocation = async (id) => await ContactOfficeLocation.findByIdAndDelete(id);