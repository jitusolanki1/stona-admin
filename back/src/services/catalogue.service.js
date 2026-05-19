const { Catalogue } = require('../models');

exports.createCatalogue = async (data) => await Catalogue.create(data);
exports.getAllCatalogues = async (filters) => await Catalogue.find(filters);
exports.getCatalogueById = async (id) => await Catalogue.findById(id);
exports.updateCatalogue = async (id, data) => await Catalogue.findByIdAndUpdate(id, data, { new: true });
exports.deleteCatalogue = async (id) => await Catalogue.findByIdAndDelete(id);