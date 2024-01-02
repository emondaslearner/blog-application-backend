const { Article } = require("../../model");
const { error } = require("../../utils");
const createItem = require("./create");

/**
 * Updates or creates an article with the provided data.
 *
 * @async
 * @function
 * @param {string} id - The unique identifier of the article to update. If not present, a new article will be created.
 * @param {Object} data - The data to update or create the article.
 * @param {string} data.title - The title of the article.
 * @param {string} data.content - The content of the article.
 * @param {string} [data.status] - The status of the article. Defaults to 'public' if not provided.
 * @param {Object} data.author - The author of the article.
 * @param {string} data.author.id - The unique identifier of the author.
 * @throws {BadRequestError} Throws a bad request error if the title or content is missing.
 * @returns {Promise<{ article: Object, code: number }>} A promise that resolves to an object containing the updated or created article and the HTTP status code (200 for update, 201 for create).
 */
const updateOrCreate = async (id, { title, content, status, author }) => {
  if (!title || !content) throw error.badRequest("Field is missing");

  const article = await Article.findById(id);

  if (!article) {
    const create = await createItem({
      title,
      content,
      user: author,
      id
    });

    return { article: create, code: 201 };
  }

  const payload = {
    title,
    content,
    status,
    author: author.id,
  };

  article.overwrite(payload);
  await article.save();

  return { article: { ...article._doc, id: article.id }, code: 200 };
};

module.exports = updateOrCreate;
