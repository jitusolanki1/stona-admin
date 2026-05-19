const factory = require('../utils/crudFactory');
const { FinishType } = require('../models');

exports.createFinishType = factory.createOne(FinishType);
exports.getAllFinishTypes = factory.getAll(FinishType);
exports.getFinishType = factory.getOne(FinishType);
exports.updateFinishType = factory.updateOne(FinishType);
exports.deleteFinishType = factory.deleteOne(FinishType);
