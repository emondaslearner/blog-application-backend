const { updateItem: updateLib } = require("../../../../lib/article");

const updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const article = await updateLib(id, {
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });

    const response = {
      code: 200,
      message: "Post updated successfully",
      data: article,
      self: `/article/${id}`,
      links: {
        comments: `/article/${id}/comments`,
      },
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;
