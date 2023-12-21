const { Article } = require("../../model");

/**
 * Count the number of articles based on a search string.
 *
 * @param {Object} options - Options for counting articles.
 * @param {string} options.search - Search string to filter articles by title.
 * @returns {number} - Number of articles that match the search criteria.
 */
const countArticles = async ({search = ''}) => {
    const filter = {
        title: { $regex: search, $options: "i" },
      };

    return await Article.countDocuments(filter);
}

module.exports = countArticles;