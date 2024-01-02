const { countComments, findAllComments } = require("../../../../lib/comment");
const { query } = require("../../../../utils");

const getAllComments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortType = req.query.sortType || "dsc";
    const sortBy = req.query.sortBy || "updatedAt";
    const search = req.query.search || "";

    const comments = await findAllComments({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    const mainData = await query.transformData({
      items: comments,
      selections: ['article', 'id', 'body', 'status', 'updatedAt', 'author'],
      path: "/comments",
    });

    // pagination
    const totalArticle = await countComments({ search: search });
    const pagination = await query.getPagination({
      totalItems: totalArticle,
      limit,
      page,
    });

    // hateoas
    const hateoas = await query.getHATEOASForAllItems({
      path: req.path,
      page,
      query: {
        ...req.query,
        page: parseInt(req.query.page),
        limit: parseInt(req.query.limit),
      },
      hasPrev: !!pagination.prvPage,
      hasNext: !!pagination.nxtPage,
    });

    const response = {
      code: 200,
      message: "Fetched comments successfully",
      data: mainData,
      self: req.url,
      links: hateoas,
      pagination,
    };

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = getAllComments;
