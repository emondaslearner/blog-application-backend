const express = require("express");
const middlewares = require("./middleware");

const app = express();
middlewares(app);

app.get("/health", (_req, res) => {
  res.status(200).json({
    health: "ok",
    message: "request for data",
  });
});

module.exports = app;
