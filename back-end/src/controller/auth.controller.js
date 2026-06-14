const catchAsync = require("../utils/catchAsync.js");
const { registerUser, loginUser } = require("../services/auth.services.js");

const register = catchAsync(async (req, res, next) => {
  const data = await registerUser(req.body);

  res.status(201).json({
    status: "success",
    data: data,
  });
});

const login = catchAsync(async (req, res, next) => {
  const data = await loginUser(req.body);

  res.status(200).json({
    status: "success",
    data: data,
  });
});

module.exports = { register, login };
