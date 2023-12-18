const { error } = require("../../utils");
const { User } = require("../../model");

/**
 * Find a document by its ID.
 *
 * @param {string} id - The ID of the document to find.
 * @returns {Promise<Object|null>} A promise that resolves to the found document or null if not found.
 * @throws {Error} Throws an error if there is an issue with the database query.
 */

const findById = async (id) => {
  if (!id) throw error.badRequest("Id Not Provided");

  const user = await User.findById(id);
  return user;
};

module.exports = findById;
