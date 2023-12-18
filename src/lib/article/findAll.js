const findAll = ({
  page = 1,
  limit = 10,
  sortType = "dsc",
  sortBy = "updatedAt",
  search = "",
  expand = "",
}) => {
  console.log({
    page,
    limit,
    sortType,
    sortBy,
    search,
    expand,
  });
};

module.exports = findAll;
