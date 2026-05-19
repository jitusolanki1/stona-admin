const factory = require('../utils/crudFactory');
const { Collection } = require('../models');

exports.createCollection = factory.createOne(Collection);
exports.getAllCollections = factory.getAll(Collection);
exports.getCollection = factory.getOne(Collection);
exports.updateCollection = factory.updateOne(Collection);
exports.deleteCollection = factory.deleteOne(Collection);