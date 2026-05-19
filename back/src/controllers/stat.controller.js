const factory = require('../utils/crudFactory');
const { Stat } = require('../models');

exports.createStat = factory.createOne(Stat);
exports.getAllStats = factory.getAll(Stat);
exports.getStat = factory.getOne(Stat);
exports.updateStat = factory.updateOne(Stat);
exports.deleteStat = factory.deleteOne(Stat);