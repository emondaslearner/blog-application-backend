const { signUp, signIn } = require("../controller");

const AuthRouters = (router) => {
  router.post("/api/v1/auth/sign-up", signUp);
  router.post("/api/v1/auth/sign-in", signIn);
};

module.exports = AuthRouters;
