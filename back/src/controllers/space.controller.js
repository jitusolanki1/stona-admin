const factory = require('../utils/crudFactory');
const { Space } = require('../models');

exports.createSpace = factory.createOne(Space);
exports.getAllSpaces = factory.getAll(Space);
exports.getSpace = factory.getOne(Space);
exports.updateSpace = factory.updateOne(Space);
exports.deleteSpace = factory.deleteOne(Space);
