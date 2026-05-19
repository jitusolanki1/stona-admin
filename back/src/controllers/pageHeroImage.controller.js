const factory = require('../utils/crudFactory');
const { PageHeroImage } = require('../models');

exports.createPageHeroImage = factory.createOne(PageHeroImage);
exports.getAllPageHeroImages = factory.getAll(PageHeroImage);
exports.getPageHeroImage = factory.getOne(PageHeroImage);
exports.updatePageHeroImage = factory.updateOne(PageHeroImage);
exports.deletePageHeroImage = factory.deleteOne(PageHeroImage);
