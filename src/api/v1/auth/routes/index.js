const { signUp } = require("../controller");

const AuthRouters = (router) => {
  router.post("/api/v1/auth/sign-up", signUp);
};

module.exports = AuthRouters;
