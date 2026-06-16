const { getUsers } = require("../repositories/users.repository.js");
const { removeUser } = require("../services/auth.services.js");
const catchAsync = require("../utils/catchAsync.js");

const getUsersController = catchAsync(async (req, res, next) => {
  const users = await getUsers();
  res.status(200).json({
    success: "success",
    data: users,
  });
  return users || [];
});
const deleteUserController = catchAsync(async (req, res, next) => {
  const user = await removeUser(req.body);

  res.status(200).json({
    success: "success",
    data: user,
  });

  return user || [];
});

module.exports = {
  getUsersController,
  deleteUserController,
};
