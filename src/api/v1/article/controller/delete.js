const { deleteArticle: deleteAri } = require("../../../../lib/article");

/**
 * Deletes an article by its ID.
 *
 * @function
 * @async
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next function to pass control to the next middleware.
 * @returns {Promise<void>} A Promise that resolves once the article is successfully deleted.
 */
const deleteArticle = async (req, res, next) => {
  const id = req.params.id;
  try {
    await deleteAri(id);
    res.status(204).end();
  } catch (e) {
    next(e);
  }
};

module.exports = deleteArticle;
