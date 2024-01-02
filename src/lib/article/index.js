const findAllItem = require("./findAll");
const createItem = require("./create");
const countArticles = require("./count");
const findSingleItem = require("./findSingle");
const deleteArticle = require("./delete");
const updateOrCreate = require("./updateOrCreate");
const updateItem = require("./update");

module.exports = {
  findAllItem,
  createItem,
  countArticles,
  findSingleItem,
  deleteArticle,
  updateOrCreate,
  updateItem
};
