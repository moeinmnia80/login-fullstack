const { getUsers } = require("../repositories/users.repository.js");
const catchAsync = require("../utils/catchAsync.js");

const getUsersController = catchAsync(async (req, res, next) => {
  const users = await getUsers();
  res.status(200).json({
    success: "success",
    data: users,
  });
  return users || [];
});

module.exports = {
  getUsersController,
};
