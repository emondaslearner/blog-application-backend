const { error } = require("../../utils");
const { generateToken } = require("../token");
const { createUser } = require("../user");

/**
 * Sign up a new user.
 *
 * @param {Object} userCredentials - The user credentials.
 * @param {string} userCredentials.name - The user's name.
 * @param {string} userCredentials.email - The user's email address.
 * @param {string} userCredentials.password - The user's password.
 *
 * @returns {void}
 * @throws {Error} If there is an issue with the signup process.
 */
const signup = async ({ name, email, password }) => {
  console.log('Hello world');
  if (!name || !email || !password) throw error.badRequest("Invalid information");
  console.log('Hello world 2');

  const userData = await createUser({
    name,
    email,
    password,
  });

  const data = {
    id: userData.id || userData._id,
    name: userData.name,
    email: userData.email,
  };

  const token = await generateToken({
    data,
  });

  return {
    token,
    id: userData.id || userData._id,
  };
};

module.exports = signup;
