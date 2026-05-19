# API Documentation

This document outlines all available API endpoints, their methods, and the expected data for POST/PUT requests.

## Base URL

`http://localhost:5000/api`

---

## Product API

### Endpoints

- **GET** `/api/products` - Get all Products
- **GET** `/api/products/:id` - Get a single Product by ID
- **POST** `/api/products` - Create a new Product
- **PUT** `/api/products/:id` - Update an existing Product
- **DELETE** `/api/products/:id` - Delete a Product

### Payload for POST / PUT

| Field Name     | Type    | Required |
| -------------- | ------- | -------- |
| name           | String  | Yes      |
| collectionName | String  | No       |
| category       | String  | No       |
| slug           | String  | Yes      |
| finish         | String  | No       |
| sizes          | Array   | No       |
| thickness      | String  | No       |
| material       | String  | No       |
| applications   | Array   | No       |
| price          | Number  | No       |
| description    | String  | No       |
| featured       | Boolean | No       |
| isNewItem      | Boolean | No       |
| tags           | Array   | No       |
| image          | String  | No       |
| image2         | String  | No       |
| gallery        | Array   | No       |

---

## Collection API

### Endpoints

- **GET** `/api/collections` - Get all Collections
- **GET** `/api/collections/:id` - Get a single Collection by ID
- **POST** `/api/collections` - Create a new Collection
- **PUT** `/api/collections/:id` - Update an existing Collection
- **DELETE** `/api/collections/:id` - Delete a Collection

### Payload for POST / PUT

| Field Name   | Type    | Required |
| ------------ | ------- | -------- |
| name         | String  | Yes      |
| slug         | String  | Yes      |
| tagline      | String  | No       |
| description  | String  | No       |
| image        | String  | No       |
| productCount | Number  | No       |
| featured     | Boolean | No       |
| year         | Number  | No       |

---

## Category API

### Endpoints

- **GET** `/api/categories` - Get all Categorys
- **GET** `/api/categories/:id` - Get a single Category by ID
- **POST** `/api/categories` - Create a new Category
- **PUT** `/api/categories/:id` - Update an existing Category
- **DELETE** `/api/categories/:id` - Delete a Category

### Payload for POST / PUT

| Field Name  | Type   | Required |
| ----------- | ------ | -------- |
| name        | String | Yes      |
| slug        | String | Yes      |
| count       | Number | No       |
| tagline     | String | No       |
| application | String | No       |
| image       | String | No       |

---

## Testimonial API

### Endpoints

- **GET** `/api/testimonials` - Get all Testimonials
- **GET** `/api/testimonials/:id` - Get a single Testimonial by ID
- **POST** `/api/testimonials` - Create a new Testimonial
- **PUT** `/api/testimonials/:id` - Update an existing Testimonial
- **DELETE** `/api/testimonials/:id` - Delete a Testimonial

### Payload for POST / PUT

| Field Name | Type   | Required |
| ---------- | ------ | -------- |
| name       | String | Yes      |
| role       | String | No       |
| company    | String | No       |
| quote      | String | Yes      |
| avatar     | String | No       |
| rating     | Number | No       |
| project    | String | No       |

---

## Inspiration API

### Endpoints

- **GET** `/api/inspirations` - Get all Inspirations
- **GET** `/api/inspirations/:id` - Get a single Inspiration by ID
- **POST** `/api/inspirations` - Create a new Inspiration
- **PUT** `/api/inspirations/:id` - Update an existing Inspiration
- **DELETE** `/api/inspirations/:id` - Delete a Inspiration

### Payload for POST / PUT

| Field Name     | Type   | Required |
| -------------- | ------ | -------- |
| room           | String | No       |
| title          | String | No       |
| collectionName | String | No       |
| image          | String | No       |

---

## Stat API

### Endpoints

- **GET** `/api/stats` - Get all Stats
- **GET** `/api/stats/:id` - Get a single Stat by ID
- **POST** `/api/stats` - Create a new Stat
- **PUT** `/api/stats/:id` - Update an existing Stat
- **DELETE** `/api/stats/:id` - Delete a Stat

### Payload for POST / PUT

| Field Name | Type   | Required |
| ---------- | ------ | -------- |
| value      | String | Yes      |
| label      | String | Yes      |

---

## Catalogue API

### Endpoints

- **GET** `/api/catalogues` - Get all Catalogues
- **GET** `/api/catalogues/:id` - Get a single Catalogue by ID
- **POST** `/api/catalogues` - Create a new Catalogue
- **PUT** `/api/catalogues/:id` - Update an existing Catalogue
- **DELETE** `/api/catalogues/:id` - Delete a Catalogue

### Payload for POST / PUT

| Field Name | Type   | Required |
| ---------- | ------ | -------- |
| title      | String | Yes      |
| subtitle   | String | No       |
| pages      | Number | No       |
| size       | String | No       |
| cover      | String | No       |
| type       | String | No       |
| year       | Number | No       |

---

## FinishType API

### Endpoints

- **GET** `/api/finish-types` - Get all FinishTypes
- **GET** `/api/finish-types/:id` - Get a single FinishType by ID
- **POST** `/api/finish-types` - Create a new FinishType
- **PUT** `/api/finish-types/:id` - Update an existing FinishType
- **DELETE** `/api/finish-types/:id` - Delete a FinishType

### Payload for POST / PUT

| Field Name | Type   | Required |
| ---------- | ------ | -------- |
| name       | String | Yes      |

---

## TileSize API

### Endpoints

- **GET** `/api/tile-sizes` - Get all TileSizes
- **GET** `/api/tile-sizes/:id` - Get a single TileSize by ID
- **POST** `/api/tile-sizes` - Create a new TileSize
- **PUT** `/api/tile-sizes/:id` - Update an existing TileSize
- **DELETE** `/api/tile-sizes/:id` - Delete a TileSize

### Payload for POST / PUT

| Field Name | Type   | Required |
| ---------- | ------ | -------- |
| value      | String | Yes      |

---

## Space API

### Endpoints

- **GET** `/api/spaces` - Get all Spaces
- **GET** `/api/spaces/:id` - Get a single Space by ID
- **POST** `/api/spaces` - Create a new Space
- **PUT** `/api/spaces/:id` - Update an existing Space
- **DELETE** `/api/spaces/:id` - Delete a Space

### Payload for POST / PUT

| Field Name | Type   | Required |
| ---------- | ------ | -------- |
| name       | String | Yes      |
| image      | String | No       |

---

## PageHeroImage API

### Endpoints

- **GET** `/api/page-hero-images` - Get all PageHeroImages
- **GET** `/api/page-hero-images/:id` - Get a single PageHeroImage by ID
- **POST** `/api/page-hero-images` - Create a new PageHeroImage
- **PUT** `/api/page-hero-images/:id` - Update an existing PageHeroImage
- **DELETE** `/api/page-hero-images/:id` - Delete a PageHeroImage

### Payload for POST / PUT

| Field Name | Type   | Required |
| ---------- | ------ | -------- |
| page       | String | Yes      |
| image      | String | No       |

---

## HeroSlide API

### Endpoints

- **GET** `/api/hero-slides` - Get all HeroSlides
- **GET** `/api/hero-slides/:id` - Get a single HeroSlide by ID
- **POST** `/api/hero-slides` - Create a new HeroSlide
- **PUT** `/api/hero-slides/:id` - Update an existing HeroSlide
- **DELETE** `/api/hero-slides/:id` - Delete a HeroSlide

### Payload for POST / PUT

| Field Name | Type   | Required |
| ---------- | ------ | -------- |
| image      | String | No       |
| ctaLink    | String | No       |

---

## TileCalculatorConfig API

### Endpoints

- **GET** `/api/tile-calculator-configs` - Get all TileCalculatorConfigs
- **GET** `/api/tile-calculator-configs/:id` - Get a single TileCalculatorConfig by ID
- **POST** `/api/tile-calculator-configs` - Create a new TileCalculatorConfig
- **PUT** `/api/tile-calculator-configs/:id` - Update an existing TileCalculatorConfig
- **DELETE** `/api/tile-calculator-configs/:id` - Delete a TileCalculatorConfig

### Payload for POST / PUT

| Field Name           | Type   | Required |
| -------------------- | ------ | -------- |
| defaultBoxCoverage   | Number | No       |
| roomPresetDimensions | Array  | No       |
| wastageOptionValues  | Array  | No       |
| tileFormats          | Array  | No       |

---

## HomeApplicationArea API

### Endpoints

- **GET** `/api/home-application-areas` - Get all HomeApplicationAreas
- **GET** `/api/home-application-areas/:id` - Get a single HomeApplicationArea by ID
- **POST** `/api/home-application-areas` - Create a new HomeApplicationArea
- **PUT** `/api/home-application-areas/:id` - Update an existing HomeApplicationArea
- **DELETE** `/api/home-application-areas/:id` - Delete a HomeApplicationArea

### Payload for POST / PUT

| Field Name | Type   | Required |
| ---------- | ------ | -------- |
| key        | String | Yes      |
| nameKey    | String | Yes      |
| image      | String | No       |

---

## PressRelease API

### Endpoints

- **GET** `/api/press-releases` - Get all PressReleases
- **GET** `/api/press-releases/:id` - Get a single PressRelease by ID
- **POST** `/api/press-releases` - Create a new PressRelease
- **PUT** `/api/press-releases/:id` - Update an existing PressRelease
- **DELETE** `/api/press-releases/:id` - Delete a PressRelease

### Payload for POST / PUT

| Field Name | Type   | Required |
| ---------- | ------ | -------- |
| title      | String | Yes      |
| category   | String | No       |
| date       | String | No       |
| excerpt    | String | No       |
| image      | String | No       |

---

## MediaAsset API

### Endpoints

- **GET** `/api/media-assets` - Get all MediaAssets
- **GET** `/api/media-assets/:id` - Get a single MediaAsset by ID
- **POST** `/api/media-assets` - Create a new MediaAsset
- **PUT** `/api/media-assets/:id` - Update an existing MediaAsset
- **DELETE** `/api/media-assets/:id` - Delete a MediaAsset

### Payload for POST / PUT

| Field Name | Type   | Required |
| ---------- | ------ | -------- |
| title      | String | Yes      |
| type       | String | No       |
| size       | String | No       |
| file       | String | No       |

---

## Coverage API

### Endpoints

- **GET** `/api/coverages` - Get all Coverages
- **GET** `/api/coverages/:id` - Get a single Coverage by ID
- **POST** `/api/coverages` - Create a new Coverage
- **PUT** `/api/coverages/:id` - Update an existing Coverage
- **DELETE** `/api/coverages/:id` - Delete a Coverage

### Payload for POST / PUT

| Field Name | Type   | Required |
| ---------- | ------ | -------- |
| outlet     | String | Yes      |
| headline   | String | Yes      |
| year       | Number | No       |

---

## ContactOfficeLocation API

### Endpoints

- **GET** `/api/contact-office-locations` - Get all ContactOfficeLocations
- **GET** `/api/contact-office-locations/:id` - Get a single ContactOfficeLocation by ID
- **POST** `/api/contact-office-locations` - Create a new ContactOfficeLocation
- **PUT** `/api/contact-office-locations/:id` - Update an existing ContactOfficeLocation
- **DELETE** `/api/contact-office-locations/:id` - Delete a ContactOfficeLocation

### Payload for POST / PUT

| Field Name | Type   | Required |
| ---------- | ------ | -------- |
| city       | String | Yes      |
| address    | String | No       |
| phone      | String | No       |
| email      | String | No       |

---

## SiteConfig API

### Endpoints

- **GET** `/api/site-configs` - Get all SiteConfigs
- **GET** `/api/site-configs/:id` - Get a single SiteConfig by ID
- **POST** `/api/site-configs` - Create a new SiteConfig
- **PUT** `/api/site-configs/:id` - Update an existing SiteConfig
- **DELETE** `/api/site-configs/:id` - Delete a SiteConfig

### Payload for POST / PUT

| Field Name                       | Type   | Required |
| -------------------------------- | ------ | -------- |
| ctaSectionImage                  | String | No       |
| navbarPromoImage                 | String | No       |
| promoModalImage                  | String | No       |
| homeBrandImages.primary          | String | No       |
| homeBrandImages.detail           | String | No       |
| contactMapCard.image             | String | No       |
| contactMapCard.title             | String | No       |
| contactMapCard.subtitle          | String | No       |
| collectionPhilosophyImages       | Array  | No       |
| aboutImages.hero                 | String | No       |
| aboutImages.ceoAvatar            | String | No       |
| aboutImages.manufacturingGallery | Array  | No       |

---

## Summary

**Total entities documented:** 19
**Total API endpoints available:** 95
