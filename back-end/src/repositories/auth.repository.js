const catchAsync = require("../utils/catchAsync");

const authUser = catchAsync(async (req, res, next) => {
  const user = await executeQuery("SELECT `email`, `password` FROM `users`");
  return user || null;
});
