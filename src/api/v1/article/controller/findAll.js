const {
  findAllItem: findAllArticle,
  countArticles,
} = require("../../../../lib/article");
const { query } = require("../../../../utils");

const findAll = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortType = req.query.sortType || "dsc";
    const sortBy = req.query.sortBy || "updatedAt";
    const search = req.query.search || "";

    const articles = await findAllArticle({
      page,
      limit,
      sortType,
      sortBy,
      search,
    });

    const mainData = await query.transformData({
      items: articles,
      selections: [],
      path: "/articles",
    });

    // pagination
    const totalArticle = await countArticles({ search: search });
    console.log("totalArticletotalArticletotalArticle", totalArticle);
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
      message: "Data fetched successfully",
      data: mainData,
      self: req.url,
      links: hateoas,
      pagination,
    };

    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};

module.exports = findAll;
