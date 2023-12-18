const { createUser: createItem } = require("../../../../lib/user");

const createUser = async (req, res, next) => {
  try {
    const user = await createItem({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: req.body?.role,
      status: req.body?.status,
    });

    const response = {
      code: 201,
      message: "Successfully created user account",
      data: {
        ...user,
      },
      self: req.url,
      links: {
        users: "/users?page=1&limit=10&sortType=dsc&sortBy=updatedAt",
      },
    };

    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = createUser;
