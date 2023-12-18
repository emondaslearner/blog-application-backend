const { createUser } = require('../controller')

const Router = (router) => {
    router
    .route("/api/v1/users")
    .post(createUser)
}

module.exports = Router;