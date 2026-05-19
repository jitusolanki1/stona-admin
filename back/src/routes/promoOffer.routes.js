const express = require("express");
const router = express.Router();
const { promoOfferController } = require("../controllers");
const upload = require("../middlewares/upload");
const imageProcessor = require("../utils/imageProcessor");

router
  .route("/")
  .get(promoOfferController.getAllPromoOffers)
  .post(
    upload.fields([{ name: "backgroundImage", maxCount: 1 }]),
    imageProcessor,
    promoOfferController.createPromoOffer,
  );

router
  .route("/:id")
  .get(promoOfferController.getPromoOffer)
  .put(
    upload.fields([{ name: "backgroundImage", maxCount: 1 }]),
    imageProcessor,
    promoOfferController.updatePromoOffer,
  )
  .delete(promoOfferController.deletePromoOffer);

module.exports = router;
