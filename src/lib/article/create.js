const { error } = require("../../utils");
const { Article } = require("../../model");

const create = async ({ title, content, user, id }) => {
  if (!title || !content) throw error.badRequest("Invalid information");

  let article;

  if (id) {
    article = new Article({
      _id: id,
      title,
      content,
      author: user.id,
    });
  } else {
    article = new Article({
      title,
      content,
      author: user.id,
    });
  }

  await article.save();

  return {
    ...article._doc,
    id: article.id,
  };
};

module.exports = create;
