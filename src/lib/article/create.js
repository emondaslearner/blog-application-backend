const { error } = require("../../utils");
const { Article } = require('../../model')

const create = async ({ title, content, user }) => {
  if (!title || !content) throw error.badRequest("Invalid information");

  const article = new Article({
    title,
    content,
    author: user.id
  })

  await article.save();

  return {
    ...article._doc,
    id: article.id
  }
};

module.exports = create;
