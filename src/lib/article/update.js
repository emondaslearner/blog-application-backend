const { Article } = require("../../model");
const { error } = require("../../utils");

const updateItem = async (id, { title, content, status }) => {
  const article = await Article.findById(id);
  if (!article) throw error.notFound();

  const payload = { title, content, status };

  Object.keys(payload).forEach((key) => {
    article[key] = payload[key] ?? article[key];
  });

  await article.save();

  return { ...article._doc, id: article?.id };
};

module.exports = updateItem;
