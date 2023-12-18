const authenticate = require("../../../../middleware/authenticate");
const { findAllItem, createItem } = require("../controller");

const ArticleRouters = (router) => {
  router
    .route("/api/v1/articles")
    .get(findAllItem)
    .post(authenticate, createItem);
};

module.exports = ArticleRouters;
