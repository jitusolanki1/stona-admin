const { Testimonial } = require('../models');

exports.createTestimonial = async (data) => await Testimonial.create(data);
exports.getAllTestimonials = async (filters) => await Testimonial.find(filters);
exports.getTestimonialById = async (id) => await Testimonial.findById(id);
exports.updateTestimonial = async (id, data) => await Testimonial.findByIdAndUpdate(id, data, { new: true });
exports.deleteTestimonial = async (id) => await Testimonial.findByIdAndDelete(id);