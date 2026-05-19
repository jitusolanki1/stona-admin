const { Collection } = require('../models');

exports.createCollection = async (data) => await Collection.create(data);
exports.getAllCollections = async (filters) => await Collection.find(filters);
exports.getCollectionById = async (id) => await Collection.findById(id);
exports.updateCollection = async (id, data) => await Collection.findByIdAndUpdate(id, data, { new: true });
exports.deleteCollection = async (id) => await Collection.findByIdAndDelete(id);