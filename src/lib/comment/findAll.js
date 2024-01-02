const { Comment } = require("../../model");

/**
 * Finds and retrieves comments based on the provided options.
 *
 * @async
 * @function
 * @param {Object} options - The options for filtering, sorting, and paginating comments.
 * @param {number} [options.page=1] - The page number for pagination.
 * @param {number} [options.limit=10] - The maximum number of comments per page.
 * @param {string} [options.sortType="dsc"] - The sorting order ('asc' for ascending, 'dsc' for descending).
 * @param {string} [options.sortBy="updatedAt"] - The field to sort comments by.
 * @param {string} [options.search=""] - The search term to filter comments by title.
 * @throws {Error} Throws an error if there's an issue with the database query.
 * @returns {Promise<Array<Object>>} A promise that resolves to an array of comments with their unique identifiers.
 */
const findAllComments = async ({
  page = 1,
  limit = 10,
  sortType = "dsc",
  sortBy = "updatedAt",
  search = "",
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = {
    body: { $regex: search, $options: "i" },
  };

  const comments = await Comment.find(filter)
    .populate({ path: "author", select: "name" })
    .populate({ path: "article", select: "title" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

    console.log('commentscommentscomments', comments)

  return comments.map((comment) => ({
    ...comment._doc,
    id: comment.id,
  }));
};

module.exports = findAllComments;
