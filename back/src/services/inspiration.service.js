const { Inspiration } = require('../models');

exports.createInspiration = async (data) => await Inspiration.create(data);
exports.getAllInspirations = async (filters) => await Inspiration.find(filters);
exports.getInspirationById = async (id) => await Inspiration.findById(id);
exports.updateInspiration = async (id, data) => await Inspiration.findByIdAndUpdate(id, data, { new: true });
exports.deleteInspiration = async (id) => await Inspiration.findByIdAndDelete(id);