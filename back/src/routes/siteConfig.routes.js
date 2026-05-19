const express = require('express');
const router = express.Router();
const { siteConfigController } = require('../controllers');
const upload = require('../middlewares/upload');
const imageProcessor = require('../utils/imageProcessor');

const uploadFields = upload.fields([
  { name: 'logo', maxCount: 1 },
  { name: 'footerLogo', maxCount: 1 },
  { name: 'ctaSectionImage', maxCount: 1 },
  { name: 'navbarPromoImage', maxCount: 1 },
  { name: 'promoModalImage', maxCount: 1 },
  { name: 'homeBrandImages.primary', maxCount: 1 },
  { name: 'homeBrandImages.detail', maxCount: 1 },
  { name: 'contactMapCard.image', maxCount: 1 },
  { name: 'collectionPhilosophyImages', maxCount: 10 },
  { name: 'aboutImages.hero', maxCount: 1 },
  { name: 'aboutImages.ceoAvatar', maxCount: 1 },
  { name: 'aboutImages.manufacturingGallery', maxCount: 10 }
]);

router.route('/')
  .get(siteConfigController.getAllSiteConfigs)
  .post(
    uploadFields,
    imageProcessor,
    siteConfigController.createSiteConfig
  );

router.route('/:id')
  .get(siteConfigController.getSiteConfig)
  .put(
    uploadFields,
    imageProcessor,
    siteConfigController.updateSiteConfig
  )
  .delete(siteConfigController.deleteSiteConfig);

module.exports = router;