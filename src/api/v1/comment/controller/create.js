const { createComment } = require("../../../../lib/comment");

/**
 * Creates a new comment based on the provided request data.
 *
 * @async
 * @function
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next function to pass control to the next middleware.
 * @returns {Promise<void>} A Promise that resolves once the comment is successfully created, and the response is sent.
 */
const create = async (req, res, next) => {
  try {
    const comment = await createComment({
      body: req.body.body,
      author: req.user,
      articleId: req.body.articleId,
    });

    const response = {
      code: 201,
      message: "Comment created successfully",
      data: comment,
      self: "/comments",
      links: {
        comments: `/article/${req.body.articleId}/comments`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
