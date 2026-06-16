const getCourses = require("../repositories/courses.repository.js");
const catchAsync = require("../utils/catchAsync.js");

const getCoursesController = catchAsync(async (req, res, next) => {
  const courses = await getCourses();
  return res.status(200).json({
    status: "success",
    data: courses,
  });
});

module.exports = {
  getCoursesController,
};
