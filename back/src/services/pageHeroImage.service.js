const { PageHeroImage } = require('../models');

exports.createPageHeroImage = async (data) => await PageHeroImage.create(data);
exports.getAllPageHeroImages = async (filters) => await PageHeroImage.find(filters);
exports.getPageHeroImageById = async (id) => await PageHeroImage.findById(id);
exports.updatePageHeroImage = async (id, data) => await PageHeroImage.findByIdAndUpdate(id, data, { new: true });
exports.deletePageHeroImage = async (id) => await PageHeroImage.findByIdAndDelete(id);
