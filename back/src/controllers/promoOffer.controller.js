const factory = require("../utils/crudFactory");
const { PromoOffer } = require("../models");

exports.createPromoOffer = factory.createOne(PromoOffer);
exports.getAllPromoOffers = factory.getAll(PromoOffer);
exports.getPromoOffer = factory.getOne(PromoOffer);
exports.updatePromoOffer = factory.updateOne(PromoOffer);
exports.deletePromoOffer = factory.deleteOne(PromoOffer);
