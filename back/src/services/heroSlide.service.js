const { HeroSlide } = require('../models');

exports.createHeroSlide = async (data) => await HeroSlide.create(data);
exports.getAllHeroSlides = async (filters) => await HeroSlide.find(filters);
exports.getHeroSlideById = async (id) => await HeroSlide.findById(id);
exports.updateHeroSlide = async (id, data) => await HeroSlide.findByIdAndUpdate(id, data, { new: true });
exports.deleteHeroSlide = async (id) => await HeroSlide.findByIdAndDelete(id);
