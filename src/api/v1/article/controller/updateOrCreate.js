const updateOrCreateLib = require("../../../../lib/article/updateOrCreate");

/**
 * Updates or creates an article based on the provided request data.
 *
 * @function
 * @async
 * @param {import('express').Request} req - The Express request object.
 * @param {import('express').Response} res - The Express response object.
 * @param {import('express').NextFunction} next - The Express next function to pass control to the next middleware.
 * @returns {Promise<void>} A Promise that resolves once the article is successfully updated or created, and the response is sent.
 */
const updateOrCreate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const status = req.body.status || "waiting for approval";

    const { article, code } = await updateOrCreateLib(id, {
      title: req.body.title,
      content: req.body.content,
      status,
      author: req.user,
    });

    const response = {
      code,
      message:
        code === 200
          ? "Post updated successfully"
          : "Post created successfully",
      data: article,
      self: `/article/${id}`,
      links: {
        comments: `/article/${id}/comments`,
      },
    };

    res.status(code).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateOrCreate;
