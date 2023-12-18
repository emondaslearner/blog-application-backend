const { signup } = require("../../../../lib/auth");

/**
 * Handle user signup.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Object} next - The Express response object.
 *
 * @returns {void}
 */
const signupUser = async (req, res, next) => {
  try {
    const data = await signup({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const response = {
      code: 201,
      message: "Successfully created account",
      data: {
        access_token: data.token,
      },
      self: req.url,
      links: {
        articles:
          "/articles?sortType=des&sortBy=updatedAt&limit=100&page=1&expand=comment",
        user: `/user/${data.id}`,
        login: "/auth/sign-in",
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = signupUser;
