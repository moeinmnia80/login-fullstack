const getCourses = require("../repositories/courses.repository.js");
const catchAsync = require("../utils/catchAsync.js");

const getCoursesController = catchAsync(async (req, res, next) => {
  const courses = await getCourses();

  res.status(200).json({
    status: "success",
    data: courses,
  });
  return courses;
});

module.exports = {
  getCoursesController,
};
