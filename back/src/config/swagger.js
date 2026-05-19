const {
  Catalogue,
  Category,
  Collection,
  ContactOfficeLocation,
  Coverage,
  FinishType,
  HeroSlide,
  HomeApplicationArea,
  Inspiration,
  MediaAsset,
  PageHeroImage,
  PressRelease,
  Product,
  SiteConfig,
  Space,
  Stat,
  Testimonial,
  TileCalculatorConfig,
  TileSize,
} = require("../models");

const entities = [
  { name: "product", path: "products", tag: "Products", model: Product },
  {
    name: "collection",
    path: "collections",
    tag: "Collections",
    model: Collection,
  },
  { name: "category", path: "categories", tag: "Categories", model: Category },
  {
    name: "testimonial",
    path: "testimonials",
    tag: "Testimonials",
    model: Testimonial,
  },
  {
    name: "inspiration",
    path: "inspirations",
    tag: "Inspirations",
    model: Inspiration,
  },
  { name: "stat", path: "stats", tag: "Stats", model: Stat },
  {
    name: "catalogue",
    path: "catalogues",
    tag: "Catalogues",
    model: Catalogue,
  },
  {
    name: "finishType",
    path: "finish-types",
    tag: "FinishTypes",
    model: FinishType,
  },
  { name: "tileSize", path: "tile-sizes", tag: "TileSizes", model: TileSize },
  { name: "space", path: "spaces", tag: "Spaces", model: Space },
  {
    name: "pageHeroImage",
    path: "page-hero-images",
    tag: "PageHeroImages",
    model: PageHeroImage,
  },
  {
    name: "heroSlide",
    path: "hero-slides",
    tag: "HeroSlides",
    model: HeroSlide,
  },
  {
    name: "tileCalculatorConfig",
    path: "tile-calculator-configs",
    tag: "TileCalculatorConfigs",
    model: TileCalculatorConfig,
  },
  {
    name: "homeApplicationArea",
    path: "home-application-areas",
    tag: "HomeApplicationAreas",
    model: HomeApplicationArea,
  },
  {
    name: "pressRelease",
    path: "press-releases",
    tag: "PressReleases",
    model: PressRelease,
  },
  {
    name: "mediaAsset",
    path: "media-assets",
    tag: "MediaAssets",
    model: MediaAsset,
  },
  { name: "coverage", path: "coverages", tag: "Coverages", model: Coverage },
  {
    name: "contactOfficeLocation",
    path: "contact-office-locations",
    tag: "ContactOfficeLocations",
    model: ContactOfficeLocation,
  },
  {
    name: "siteConfig",
    path: "site-configs",
    tag: "SiteConfigs",
    model: SiteConfig,
  },
];

const mapMongooseTypeToOpenAPI = (mongooseType) => {
  switch (mongooseType) {
    case "String":
      return "string";
    case "Number":
      return "number";
    case "Boolean":
      return "boolean";
    case "Array":
      return "array";
    case "Date":
      return "string";
    case "ObjectId":
      return "string";
    case "Mixed":
      return "object";
    default:
      return "string";
  }
};

const generateProperties = (model) => {
  const properties = {};
  if (!model || !model.schema || !model.schema.paths) return properties;

  for (const [pathName, pathType] of Object.entries(model.schema.paths)) {
    if (
      pathName === "__v" ||
      pathName === "_id" ||
      pathName === "createdAt" ||
      pathName === "updatedAt"
    )
      continue;

    let type = mapMongooseTypeToOpenAPI(pathType.instance);
    let format;

    if (type === "string") {
      const lowerPath = pathName.toLowerCase();
      if (
        lowerPath.includes("image") ||
        lowerPath.includes("file") ||
        lowerPath.includes("gallery") ||
        lowerPath.includes("hero") ||
        lowerPath.includes("avatar")
      ) {
        format = "binary";
      }
    }

    properties[pathName] = { type };
    if (format) properties[pathName].format = format;

    if (type === "array") {
      properties[pathName].items = { type: "string" };
      const lowerPath = pathName.toLowerCase();
      if (
        lowerPath.includes("image") ||
        lowerPath.includes("file") ||
        lowerPath.includes("gallery")
      ) {
        properties[pathName].items.format = "binary";
      }
    }
  }
  return properties;
};

const paths = {};

entities.forEach((ent) => {
  const basePath = `/api/${ent.path}`;
  const idPath = `/api/${ent.path}/{id}`;

  const schemaProperties = generateProperties(ent.model);

  paths[basePath] = {
    get: {
      tags: [ent.tag],
      summary: `Get all ${ent.path}`,
      parameters: [
        { name: "page", in: "query", schema: { type: "integer" } },
        { name: "limit", in: "query", schema: { type: "integer" } },
        { name: "search", in: "query", schema: { type: "string" } },
        { name: "sort", in: "query", schema: { type: "string" } },
      ],
      responses: { 200: { description: "Success" } },
    },
    post: {
      tags: [ent.tag],
      summary: `Create a ${ent.name}`,
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: { type: "object", properties: schemaProperties },
          },
          "application/json": {
            schema: { type: "object", properties: schemaProperties },
          },
        },
      },
      responses: { 201: { description: "Created" } },
    },
  };

  paths[idPath] = {
    get: {
      tags: [ent.tag],
      summary: `Get ${ent.name} by ID`,
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        200: { description: "Success" },
        404: { description: "Not Found" },
      },
    },
    put: {
      tags: [ent.tag],
      summary: `Update ${ent.name} by ID`,
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      requestBody: {
        content: {
          "multipart/form-data": {
            schema: { type: "object", properties: schemaProperties },
          },
          "application/json": {
            schema: { type: "object", properties: schemaProperties },
          },
        },
      },
      responses: {
        200: { description: "Success" },
        404: { description: "Not Found" },
      },
    },
    delete: {
      tags: [ent.tag],
      summary: `Delete ${ent.name} by ID`,
      parameters: [
        { name: "id", in: "path", required: true, schema: { type: "string" } },
      ],
      responses: {
        200: { description: "Success" },
        404: { description: "Not Found" },
      },
    },
  };
});

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "Tiles API",
    version: "1.0.0",
    description: "API documentation for Tiles Backend",
  },
  servers: [
    {
      url: process.env.API_SERVER_URL || "http://localhost:5000",
      description:
        process.env.NODE_ENV === "production" ? "Production" : "Development",
    },
  ],
  paths,
};

module.exports = swaggerDocument;
