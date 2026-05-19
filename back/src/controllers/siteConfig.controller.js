const factory = require('../utils/crudFactory');
const { SiteConfig } = require('../models');

exports.createSiteConfig = factory.createOne(SiteConfig);
exports.getAllSiteConfigs = factory.getAll(SiteConfig);
exports.getSiteConfig = factory.getOne(SiteConfig);
exports.updateSiteConfig = factory.updateOne(SiteConfig);
exports.deleteSiteConfig = factory.deleteOne(SiteConfig);