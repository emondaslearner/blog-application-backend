const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const router = require('../routes');
const OpenApiValidator = require('express-openapi-validator');

const swaggerDocument = YAML.load(
  path.join(__dirname, '../swagger', 'v1', 'swagger.yaml')
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
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(router);
};

module.exports = middlewares;