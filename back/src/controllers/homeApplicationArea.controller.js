const factory = require('../utils/crudFactory');
const { HomeApplicationArea } = require('../models');

exports.createHomeApplicationArea = factory.createOne(HomeApplicationArea);
exports.getAllHomeApplicationAreas = factory.getAll(HomeApplicationArea);
exports.getHomeApplicationArea = factory.getOne(HomeApplicationArea);
exports.updateHomeApplicationArea = factory.updateOne(HomeApplicationArea);
exports.deleteHomeApplicationArea = factory.deleteOne(HomeApplicationArea);