const router = require("express").Router();
const ArticleRouters = require("../api/v1/article/routes");
const AuthRouters = require("../api/v1/auth/routes");
const CommentRoutes = require("../api/v1/comment/routes");
const UserRouters = require("../api/v1/user/routes");

// All routers
// Article router
ArticleRouters(router);

// User router
UserRouters(router);

// Auth router
AuthRouters(router);

// Comment router
CommentRoutes(router);

module.exports = router;
