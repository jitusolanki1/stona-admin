const { SiteConfig } = require('../models');

exports.createSiteConfig = async (data) => await SiteConfig.create(data);
exports.getAllSiteConfigs = async (filters) => await SiteConfig.find(filters);
exports.getSiteConfigById = async (id) => await SiteConfig.findById(id);
exports.updateSiteConfig = async (id, data) => await SiteConfig.findByIdAndUpdate(id, data, { new: true });
exports.deleteSiteConfig = async (id) => await SiteConfig.findByIdAndDelete(id);