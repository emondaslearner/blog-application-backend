const { Comment } = require("../../model");

/**
 * Count the number of articles based on a search string.
 *
 * @param {Object} options - Options for counting articles.
 * @param {string} options.search - Search string to filter articles by title.
 * @returns {number} - Number of articles that match the search criteria.
 */
const countComments = async ({search = ''}) => {
    const filter = {
        body: { $regex: search, $options: "i" },
      };

    return await Comment.countDocuments(filter);
}

module.exports = countComments;