const { error } = require("../../utils");
const { Article } = require('../../model')

const create = ({ title, content }) => {
  if (!title || !content) throw error.badRequest("Invalid information");

  const article = new Article({
    title,
    content
  })

};

module.exports = create;
