const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
const router = require("../routes");
const OpenApiValidator = require("express-openapi-validator");
const cookieParser = require("cookie-parser");

const swaggerDocument = YAML.load(
  path.join(__dirname, "../swagger", "v1", "swagger.yaml")
);

const middlewares = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(express.json());
  // app.use(
  //   OpenApiValidator.middleware({
  //     apiSpec: path.join(__dirname, '../swagger', 'v1', 'swagger.yaml'),
  //   })
  // );
  app.use(cookieParser());
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(router);
  
  app.use((err, _req, res, next) => {
    // TODO: format error
    console.log('error', err.message)
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  });
};

module.exports = middlewares;
