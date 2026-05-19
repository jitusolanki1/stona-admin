const factory = require('../utils/crudFactory');
const { Testimonial } = require('../models');

exports.createTestimonial = factory.createOne(Testimonial);
exports.getAllTestimonials = factory.getAll(Testimonial);
exports.getTestimonial = factory.getOne(Testimonial);
exports.updateTestimonial = factory.updateOne(Testimonial);
exports.deleteTestimonial = factory.deleteOne(Testimonial);