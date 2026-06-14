const fetchData = require("../config/db.js");

const getCourses = async () => {
  const courses = await fetchData("SELECT * FROM `courses`");
  return courses || [];
};

module.exports = getCourses;
