const { signIn } = require("../../../../lib/auth");

/**
 * Handle user signup.
 *
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * @param {Object} next - The Express response object.
 *
 * @returns {void}
 */
const signInUser = async (req, res, next) => {
  try {
    const data = {
      email: req.body.email,
      password: req.body.password,
    };

    const responseData = await signIn(data);

    const response = {
      code: 200,
      data: {
        access_token: responseData?.token,
      },
      self: "/auth/sign-in",
      links: {
        articles:
          "/articles?sortType=des&sortBy=updatedAt&limit=100&page=1&expand=comment",
        user: `/user/${responseData?.id}`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = signInUser;
