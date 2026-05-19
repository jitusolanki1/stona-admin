const factory = require('../utils/crudFactory');
const { Inspiration } = require('../models');

exports.createInspiration = factory.createOne(Inspiration);
exports.getAllInspirations = factory.getAll(Inspiration);
exports.getInspiration = factory.getOne(Inspiration);
exports.updateInspiration = factory.updateOne(Inspiration);
exports.deleteInspiration = factory.deleteOne(Inspiration);