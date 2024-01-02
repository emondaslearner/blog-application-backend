const { Comment, Article } = require("../../model");
const { error } = require("../../utils");

/**
 * Creates a new comment.
 *
 * @async
 * @function
 * @param {Object} commentData - The data for creating the comment.
 * @param {string} commentData.body - The content of the comment.
 * @param {Object} commentData.author - The author of the comment.
 * @param {string} commentData.articleId - The unique identifier of the article to which the comment belongs.
 * @throws {BadRequestError} Throws a bad request error if the body of the comment is missing.
 * @returns {Promise<Object>} A promise that resolves to the created comment, including its unique identifier.
 */
const createComment = async ({ body, author, articleId }) => {
  if (!body || !articleId) throw error.badRequest("Field is missing");

  const article = await Article.findById(articleId);
  if (!article) throw error.notFound("Article not found");

  const data = new Comment({
    author: author?.id,
    article: articleId,
    body,
  });

  await data.save();

  return {
    ...data._doc,
    id: data.id,
  };
};

module.exports = createComment;
