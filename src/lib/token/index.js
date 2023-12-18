const jwt = require("jsonwebtoken");

/**
 * Generate a JSON Web Token (JWT) with the provided data.
 *
 * @param {Object} options - The options for generating the token.
 * @param {any} options.data - The data to be included in the token payload.
 * @param {string} [options.algorithm="RS256"] - The algorithm to use for signing the token.
 * @param {string} [options.expireAt="1h"] - The expiration time for the token. It can be a number of seconds or a string describing a time span.
 * @param {string} [options.privateKey=process.env.TOKEN_SECRET] - The private key used for signing the token.
 *
 * @returns {string} The generated JWT.
 * @throws {Error} If there is an issue with generating the token.
 */

const generateToken = async ({
  data,
  expireAt = "1h",
  privateKey = process.env.TOKEN_SECRET,
}) => {
  const token = await jwt.sign(data, privateKey, {
    expiresIn: expireAt,
  });

  return token;
};


/**
 * Verify and decode a JSON Web Token (JWT) using the provided token and options.
 *
 * @param {Object} options - The options for verifying the token.
 * @param {string} options.token - The JWT to be verified and decoded.
 * @param {string} [options.privateKey=process.env.TOKEN_SECRET] - The private key used for verifying the token's signature.
 * @param {string} [options.algorithm="RS256"] - The algorithm expected to be used for signing the token.
 * 
 * @returns {Promise<Object>} A Promise that resolves to the decoded payload of the verified token.
 * @throws {Error} If there is an issue with verifying or decoding the token.
 */

const verifyToken = async ({
  token,
  privateKey = process.env.TOKEN_SECRET
}) => {
  const decoded = await jwt.verify(token, privateKey);
  
  return decoded;
};


module.exports = {
  generateToken,
  verifyToken
};
