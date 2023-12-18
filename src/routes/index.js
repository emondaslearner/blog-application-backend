const router = require("express").Router();
const ArticleRouters = require("../api/v1/article/routes");
const AuthRouters = require("../api/v1/auth/routes");
const UserRouters = require("../api/v1/user/routes");

// All routers
// Article routers
ArticleRouters(router);

// User routers
UserRouters(router);

// Auth routers
AuthRouters(router);

module.exports = router;
