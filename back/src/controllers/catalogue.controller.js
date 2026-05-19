const factory = require('../utils/crudFactory');
const { Catalogue } = require('../models');

exports.createCatalogue = factory.createOne(Catalogue);
exports.getAllCatalogues = factory.getAll(Catalogue);
exports.getCatalogue = factory.getOne(Catalogue);
exports.updateCatalogue = factory.updateOne(Catalogue);
exports.deleteCatalogue = factory.deleteOne(Catalogue);