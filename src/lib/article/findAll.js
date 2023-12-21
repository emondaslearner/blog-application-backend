const { Article } = require("../../model");

/**
 * Find all articles based on specified criteria.
 *
 * @param {Object} options - Options for querying articles.
 * @param {number} options.page - Page number (default is 1).
 * @param {number} options.limit - Number of articles per page (default is 10).
 * @param {string} options.sortType - Sorting order ('asc' or 'dsc'; default is 'dsc').
 * @param {string} options.sortBy - Field to sort by (default is 'updatedAt').
 * @param {string} options.search - Search string to filter articles by title (default is an empty string).
 * @param {string} options.expand - Not currently used.
 * @returns {Array} - Array of articles with additional 'id' property.
 */
const findAll = async ({
  page = 1,
  limit = 10,
  sortType = "dsc",
  sortBy = "updatedAt",
  search = "",
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {
    title: { $regex: search, $options: "i" },
  };

  const articles = await Article.find(filter)
    .populate({ path: "author", select: "name" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);


  return articles.map((article) => ({
    ...article._doc,
    id: article.id,
  }));
};

module.exports = findAll;
