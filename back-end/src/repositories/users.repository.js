const fetchData = require("../config/db.js");

const findUserByEmail = async (email) => {
  const user = await fetchData(
    "SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1",
    [email],
  );
  return user || null;
};
const createUser = async ({ name, email, password }) => {
  try {
    const newUser = await fetchData(
      "INSERT INTO `users` (id, email, name, password) VALUES (?, ?, ?, ?)",
      [null, email, name, password],
    );

    const user = await fetchData(
      "SELECT * FROM `users` WHERE email = ? LIMIT 1",
      [email],
    );
    return user && user.length > 0 ? user : null;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY" || error.errno === 1062) {
      throw new AppError("این ایمیل قبلاً ثبت نام کرده است", 400);
    }
    throw error;
  }
};

const deleteUser = async (email) => {
  const user = await fetchData("DELETE FROM `users` WHERE email = ?", [email]);
  return user || [];
};
const getUsers = async () => {
  const users = await fetchData("SELECT * FROM `users`");
  return users || [];
};

module.exports = { findUserByEmail, createUser, getUsers, deleteUser };
