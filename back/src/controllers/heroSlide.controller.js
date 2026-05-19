const factory = require('../utils/crudFactory');
const { HeroSlide } = require('../models');

exports.createHeroSlide = factory.createOne(HeroSlide);
exports.getAllHeroSlides = factory.getAll(HeroSlide);
exports.getHeroSlide = factory.getOne(HeroSlide);
exports.updateHeroSlide = factory.updateOne(HeroSlide);
exports.deleteHeroSlide = factory.deleteOne(HeroSlide);
