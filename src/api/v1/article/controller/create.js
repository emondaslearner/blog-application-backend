const { createItem } = require("../../../../lib/article");

const create = async (req, res, next) => {
  try {
    console.log('user data', req?.user);
    // const article = await createItem({
    //   title: req?.body?.title,
    //   content: req?.body?.content,
    // });

    // const response = {};
  } catch (e) {
    next(e);
  }
};

module.exports = create;
