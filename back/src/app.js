const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");
const routes = require("./routes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// Get allowed origins from environment or use defaults
const getAllowedOrigins = () => {
  const defaults = [
    "http://localhost:5174", // Admin app
    "http://localhost:5173", // Frontend app
    "http://localhost:3000", // Customer frontend
  ];

  if (process.env.NODE_ENV === "production") {
    return [
      process.env.ADMIN_APP_URL,
      process.env.FRONTEND_URL,
      process.env.CUSTOMER_FRONTEND_URL,
    ].filter(Boolean);
  }

  return defaults;
};

app.use(
  cors({
    origin: getAllowedOrigins(),
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/api", routes);

app.use(errorHandler);

module.exports = app;
