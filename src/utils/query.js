const error = require("./error");
const commonFunctions = require("./commonFunction");

/**
 * Transform an array of items based on selected properties and add a 'link' property.
 *
 * @param {Object} options - Options for transforming data.
 * @param {Array} options.items - Array of items to transform.
 * @param {Array} options.selections - Array of selected properties to include in the transformed data.
 * @param {string} options.path - Path segment to be included in the 'link' property.
 * @returns {Array} - Transformed array of items with selected properties and a 'link' property.
 * @throws {Error} - Throws an error with a "badRequest" status if parameters are invalid.
 */
const transformData = async ({ items = [], selections = [], path = "/" }) => {
  if (!Array.isArray(items) || !Array.isArray(selections)) {
    throw error.badRequest("Invalid parameters");
  }

  if (selections.length === 0) {
    return items.map((data) => ({ ...data, link: `/${path}/${data?.id}` }));
  }

  return items.map((data) => {
    const result = {};

    selections.forEach((key) => {
      result[key] = data[key];
    });

    result.link = `/${path}/${data.id}`;

    return result;
  });
};

/**
 * Generate pagination information based on total items, limit, and current page.
 *
 * @param {Object} options - Options for pagination.
 * @param {number} options.totalItems - Total number of items.
 * @param {number} options.limit - Number of items per page.
 * @param {number} options.page - Current page number.
 * @returns {Object} - Pagination information including page count and current page.
 */
const getPagination = ({ totalItems = 0, limit = 10, page = 1 }) => {
  const pagination = {
    page,
    limit,
  };
  const totalPage = Math.ceil(totalItems / limit);

  if (page > 1) pagination.prvPage = page - 1;
  if (page < totalPage) pagination.nxtPage = page + 1;

  pagination.totalPage = totalPage;
  pagination.totalResource = totalItems;

  return pagination;
};

/**
 * Generate HATEOAS links for pagination, including previous and next pages.
 *
 * @param {Object} options - Options for generating HATEOAS links.
 * @param {string} options.path - Base path for the HATEOAS links.
 * @param {number} options.page - Current page number.
 * @param {Object} options.query - Query parameters for the links.
 * @param {boolean} options.hasPrev - Indicates if there is a previous page.
 * @param {boolean} options.hasNext - Indicates if there is a next page.
 * @returns {Object} - HATEOAS links object with 'prvPage' and 'nextPage' properties.
 */
const getHATEOASForAllItems = async ({
  path = "/",
  page = 1,
  query = {},
  hasPrev = false,
  hasNext = false,
}) => {
  const links = {};

  if (hasPrev) {
    const queryString = await commonFunctions.generateQueryString({
      queryObject: { ...query, page: page - 1 },
    });
    links.prvPage = `/${path}/${queryString}`;
  }

  if (hasNext) {
    const queryString = await commonFunctions.generateQueryString({
      queryObject: { ...query, page: page + 1 },
    });
    links.nxtPage = `/${path}/${queryString}`;
  }

  return links;
};

module.exports = {
  transformData,
  getPagination,
  getHATEOASForAllItems,
};
