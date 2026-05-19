const mongoose = require('mongoose');

const siteConfigSchema = new mongoose.Schema({
  // Branding
  logo: { type: String }, // Main Logo
  footerLogo: { type: String }, // Optional specific footer logo
  siteName: { type: String, default: 'STONA' },
  siteTagline: { type: String, default: 'CERAMICS' },
  footerDescription: { type: String },

  // Contact Info
  contactEmail: { type: String, default: 'info@stonaceramics.com' },
  contactPhones: [{ type: String }], // Array for multiple numbers
  address: { type: String, default: '42 Design District, Milan, Italy' },
  mapEmbedUrl: { type: String }, // Added field for map embed URL
  
  // Social Media
  socialLinks: {
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    youtube: { type: String }
  },

  // Existing fields
  ctaSectionImage: { type: String },
  navbarPromoImage: { type: String },
  promoModalImage: { type: String },
  homeBrandImages: {
    primary: { type: String },
    detail: { type: String }
  },
  contactMapCard: {
    image: { type: String },
    title: { type: String },
    subtitle: { type: String }
  },
  collectionPhilosophyImages: [{ type: String }],
  aboutImages: {
    hero: { type: String },
    ceoAvatar: { type: String },
    manufacturingGallery: [{ type: String }]
  }
}, { timestamps: true });

module.exports = mongoose.model('SiteConfig', siteConfigSchema);