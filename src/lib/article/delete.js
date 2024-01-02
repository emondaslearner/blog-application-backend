const { Article, Comment } = require('../../model');
const { error } = require('../../utils');


/**
 * Deletes all comments associated with a specific article.
 *
 * @param {string} articleId - The unique identifier of the article whose comments should be deleted.
 * @returns {Promise<{ ok?: number, n?: number }>} A promise that resolves to the result of the delete operation.
 */
const deleteAllCommentOfArticle = (id) => {
    Comment.deleteMany({ article: id });
}

/**
 * Deletes an article by its ID.
 *
 * @async
 * @function
 * @param {string} id - The unique identifier of the article to be deleted.
 * @throws {NotFoundError} Throws a not found error if the article with the specified ID is not found.
 * @returns {Promise<Document>} A promise that resolves to the deleted article document.
 */
const deleteArticle = async (id) => {
    const article = await Article.findById(id);
    
    if(!article) {
        throw error.notFound();
    }

    deleteAllCommentOfArticle(id);

    return Article.findByIdAndDelete(id);
};


module.exports = deleteArticle;