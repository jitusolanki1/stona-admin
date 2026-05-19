const { PressRelease } = require('../models');

exports.createPressRelease = async (data) => await PressRelease.create(data);
exports.getAllPressReleases = async (filters) => await PressRelease.find(filters);
exports.getPressReleaseById = async (id) => await PressRelease.findById(id);
exports.updatePressRelease = async (id, data) => await PressRelease.findByIdAndUpdate(id, data, { new: true });
exports.deletePressRelease = async (id) => await PressRelease.findByIdAndDelete(id);