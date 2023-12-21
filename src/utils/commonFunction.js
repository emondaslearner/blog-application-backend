/**
 * Generate a query string from a query object.
 *
 * @param {Object} queryObject - Query object with key-value pairs.
 * @returns {string} - Query string generated from the query object.
 */
const generateQueryString = ({ queryObject = {} }) => {
  const queryString = Object.keys(queryObject)
    .filter(
      (key) =>
        queryObject[key] !== undefined &&
        queryObject[key] !== null &&
        queryObject[key] !== ""
    )
    .map(
      (key) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`
    )
    .join("&");

  return queryString ? `?${queryString}` : "";
};

module.exports = {
  generateQueryString,
};
