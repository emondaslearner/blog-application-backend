const { findSingleItem } = require("../../../../lib/article");

const findSingle = async (req, res, next) => {
  try {
    const id = req.params.id;

    const article = await findSingleItem({
      id,
    });

    const response = {
      code: 200,
      message: "Data fetched successfully",
      data: {
        ...article,
      },
      self: `/article/${id}`,
      links: {
        user: `user/${article.author._id}`,
        comment: `/article/${id}/comments`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = findSingle;
