const catchAsync = require("../utils/catchAsync.js");
const { registerUser, loginUser } = require("../services/auth.services.js");

const register = catchAsync(async (req, res, next) => {
  const result = await registerUser(req.body);
  return res.status(201).json({
    status: "success",
    data: result,
  });
});

const login = catchAsync(async (req, res, next) => {
  const result = await loginUser(req.body);
  return res.status(200).json({
    status: "success",
    data: result,
  });
});

module.exports = { register, login };
