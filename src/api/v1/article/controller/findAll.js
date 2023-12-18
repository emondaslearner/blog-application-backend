const { findAllItem: findAllArticle } = require("../../../../lib/article");

const findAll = async (req, _res) => {

  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const sortType = req.query.sortType || 'dsc';
  const sortBy = req.query.sortBy || 'updatedAt';
  const search = req.query.search || '';
  const expand = req.query.expand || '';

  const article = await findAllArticle({
    page,
    limit,
    sortType,
    sortBy,
    search,
    expand
  });

};

module.exports = findAll;
