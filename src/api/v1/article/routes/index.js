const authenticate = require("../../../../middleware/authenticate");
const { findAllItem, createItem, findSingleItem } = require("../controller");

const ArticleRouters = (router) => {
  router
    .route("/api/v1/articles")
    .get(findAllItem)
    .post(authenticate, createItem);

  router
    .route("/api/v1/article/:id")
    .get(findSingleItem)
};

module.exports = ArticleRouters;
