const { getUsers } = require("../repositories/users.repository.js");
const { removeUser } = require("../services/auth.services.js");
const catchAsync = require("../utils/catchAsync.js");

const getUsersController = catchAsync(async (req, res, next) => {
  const users = await getUsers();
  return res.status(200).json(users);
});
const deleteUserController = catchAsync(async (req, res, next) => {
  const user = await removeUser(req.body);
  return res.status(200).json(user);
});

module.exports = {
  getUsersController,
  deleteUserController,
};
