const { Article } = require("../../model");
const { error } = require("../../utils");

/**
 * Find a single item by ID.
 *
 * @param {Object} params - Parameters for finding a single item.
 * @param {string} params.id - The ID of the item to be found.
 * @throws {Error} Throws an error if 'id' is not provided.
 * @returns {Object} The found item.
 */
const findSingle = async ({ id }) => {
  if (!id) throw error.badRequest("Please pass an id");

  const article = await Article.findById(id);

  if (!article) throw error.notFound();

  return {
    ...article._doc,
    id: article.id,
  };
};

module.exports = findSingle;
