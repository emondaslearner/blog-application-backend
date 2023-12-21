const { createItem } = require("../../../../lib/article");

const create = async (req, res, next) => {
  try {
    const article = await createItem({
      title: req?.body?.title,
      content: req?.body?.content,
      user: req.user,
    });

    const response = {
      code: 201,
      message: "Successfully created post",
      data: { ...article },
      self: "/articles",
      links: {
        createdPost: `/article/${article?.id}`,
        comments: `/comment/${article?.id}`,
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = create;
