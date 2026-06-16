const executeQuery = require("../config/db.js");

const findUserByEmail = async (email) => {
  const result = await executeQuery(
    "SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1",
    [email],
  );
  return result[0] || null;
};
const createUser = async ({ name, email, password }) => {
  const result = await executeQuery(
    "INSERT INTO `users` (email, name, password) VALUES (?, ?, ?)",
    [email, name, password],
  );

  const rows = await executeQuery(
    "SELECT * FROM `users` WHERE email = ? LIMIT 1",
    [result.insertId],
  );

  return { email, name, password } || null;
};

const deleteUser = async (email) => {
  return executeQuery("DELETE FROM `users` WHERE email = ?", [email]);
};
const getUsers = async () => {
  const users = await executeQuery("SELECT * FROM `users`");
  return users || [];
};

module.exports = { findUserByEmail, createUser, getUsers, deleteUser };
