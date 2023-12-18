const { User } = require("../../model");
const { error } = require("../../utils");
const { compareHash } = require("../../utils/hashing");
const { generateToken } = require("../token");

const signIn = async ({ email, password }) => {
  if (!email || !password) throw error.badRequest("Invalid Information");

  const user = await User.findOne({
    email,
  });

  if (!user) throw error.badRequest("Invalid Information");

  const checkPassword = await compareHash(password, user?.password);
  if (!checkPassword) throw error.badRequest("Invalid Information");

  const data = {
    id: user.id || user._id,
    name: user.name,
    email: user.email,
  };

  const token = await generateToken({
    data,
  });

  return {
    token,
    id: user.id || user._id,
  };
};

module.exports = signIn;
