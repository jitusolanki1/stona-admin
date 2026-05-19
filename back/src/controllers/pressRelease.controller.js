const factory = require('../utils/crudFactory');
const { PressRelease } = require('../models');

exports.createPressRelease = factory.createOne(PressRelease);
exports.getAllPressReleases = factory.getAll(PressRelease);
exports.getPressRelease = factory.getOne(PressRelease);
exports.updatePressRelease = factory.updateOne(PressRelease);
exports.deletePressRelease = factory.deleteOne(PressRelease);