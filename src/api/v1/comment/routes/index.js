const authenticate = require("../../../../middleware/authenticate");
const { createComment, getAllComments } = require("../controller");

const CommentRoutes = (router) => {
  router
    .route("/api/v1/comments")
    .post(authenticate, createComment)
    .get(getAllComments);
};

module.exports = CommentRoutes;
