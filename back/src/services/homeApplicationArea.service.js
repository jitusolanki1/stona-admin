const { HomeApplicationArea } = require('../models');

exports.createHomeApplicationArea = async (data) => await HomeApplicationArea.create(data);
exports.getAllHomeApplicationAreas = async (filters) => await HomeApplicationArea.find(filters);
exports.getHomeApplicationAreaById = async (id) => await HomeApplicationArea.findById(id);
exports.updateHomeApplicationArea = async (id, data) => await HomeApplicationArea.findByIdAndUpdate(id, data, { new: true });
exports.deleteHomeApplicationArea = async (id) => await HomeApplicationArea.findByIdAndDelete(id);