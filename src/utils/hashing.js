const bcrypt = require("bcryptjs");

const generateHash = async (password, round = 10) => {
  if (!password) {
    throw new Error("Password invalid");
  }

  const hashedPassword = await bcrypt.hash(password, round);
  return hashedPassword;
};

const compareHash = async (password, hashedPassword) => {
  if (!password || !hashedPassword) {
    throw new Error("Provide Information");
  }

  const hashedAns = await bcrypt.compare(password, hashedPassword);
  return hashedAns;
};

module.exports = {
  generateHash,
  compareHash,
};
