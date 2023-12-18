const { error } = require("../../utils");

const create = ({ title, body }) => {
  if (!title || !body) throw error.badRequest("Invalid information");
};

module.exports = create;
