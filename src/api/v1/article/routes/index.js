const { findAllItem, createItem } = require("../controller");

const ArticleRouters = (router) => {
  router
  .route("/api/v1/articles")
  .get(findAllItem)
  .post(createItem)
};

module.exports = ArticleRouters;
