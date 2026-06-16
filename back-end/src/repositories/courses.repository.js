const executeQuery = require("../config/db.js");

const getCourses = async () => {
  const courses = await executeQuery("SELECT * FROM `courses`");
  return courses || [];
};

module.exports = getCourses;
