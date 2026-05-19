const factory = require('../utils/crudFactory');
const { Coverage } = require('../models');

exports.createCoverage = factory.createOne(Coverage);
exports.getAllCoverages = factory.getAll(Coverage);
exports.getCoverage = factory.getOne(Coverage);
exports.updateCoverage = factory.updateOne(Coverage);
exports.deleteCoverage = factory.deleteOne(Coverage);