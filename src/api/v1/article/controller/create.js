const { createItem } = require("../../../../lib/article");

const create = async (req, _res) => {
  const article = await createItem({
    title: req?.body?.title,
    body: req?.body?.body,
  });

  const response = {};
};

module.exports = create;
