const { Stat } = require('../models');

exports.createStat = async (data) => await Stat.create(data);
exports.getAllStats = async (filters) => await Stat.find(filters);
exports.getStatById = async (id) => await Stat.findById(id);
exports.updateStat = async (id, data) => await Stat.findByIdAndUpdate(id, data, { new: true });
exports.deleteStat = async (id) => await Stat.findByIdAndDelete(id);