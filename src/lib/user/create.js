const { User } = require("../../model");
const { error } = require("../../utils");
const { generateHash } = require("../../utils/hashing");

/**
 * Create a new article
 * @param {*} param0
 * @returns
 */

const createUser = async ({ name, email, password, role = 'user', status = 'pending' }) => {
  if (!name || !email || !password) new error.badRequest("Invalid information");
  
  // hash password
  const hashPassword = await generateHash(password);

  const user = new User({
    name,
    email,
    password: hashPassword,
    role,
    status,
  });

  await user.save();

  return {
    ...user._doc,
    id: user.id,
  };
};

module.exports = createUser;
