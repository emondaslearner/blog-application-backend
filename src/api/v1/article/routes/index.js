const authenticate = require("../../../../middleware/authenticate");
const {
  findAllItem,
  createItem,
  findSingleItem,
  deleteArticle,
  updateOrCreate,
  updateItem,
} = require("../controller");

const ArticleRouters = (router) => {
  router
    .route("/api/v1/articles")
    .get(findAllItem)
    .post(authenticate, createItem);

  router
    .route("/api/v1/article/:id")
    .get(findSingleItem)
    .delete(authenticate, deleteArticle)
    .put(authenticate, updateOrCreate)
    .patch(authenticate, updateItem);
};

module.exports = ArticleRouters;
