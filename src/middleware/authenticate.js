/**
 * Middleware function to authenticate users.
 *
 * @param {Express.Request} req - The Express request object.
 * @param {Express.Response} res - The Express response object.
 * @param {function} next - The next middleware function in the chain.
 * @returns {void}
 */

const { verifyToken } = require("../lib/token");
const { findUserById } = require("../lib/user");
const { authenticationError } = require("../utils/error");

const authenticate = async (req, res, next) => {
  try {
    const getToken = req.headers.authorization || req.cookies.authorization;
    const token = getToken.split(" ")[2];

    const verify = await verifyToken({
      token,
    });

    const user = await findUserById(verify?.id);

    if (!user) throw authenticationError();
    else req.user = {
        id: user?.id,
        name: user?.name,
        email: user?.email,
        role: user?.role,
        status: user?.status
    };

    next();
  } catch (e) {
    next(authenticationError());
  }
};

module.exports = authenticate;
