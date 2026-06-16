const bcrypt = require("bcrypt");
const AppError = require("../utils/appError.js");

const {
  createUser,
  findUserByEmail,
  deleteUser,
} = require("../repositories/users.repository.js");

const removeUser = async ({ email }) => {
  const existingUser = await findUserByEmail(email);
  if (!existingUser) {
    throw new AppError("User Not Found", 404);
  }
  await deleteUser(email);

  return {
    status: "success",
    message: "User successfully deleted.",
  };
};

const registerUser = async ({ name, email, password }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new AppError("User already exists", 409);
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await createUser({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new AppError("User already exists", 409);
    }
    throw error;
  }
};

const loginUser = async ({ email, password }) => {
  const result = await findUserByEmail(email);

  if (!result) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, result?.password);
  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  return {
    status: "success",
    data: {
      name: result.name,
      email: result.email,
    },
  };
};
module.exports = { registerUser, loginUser, removeUser };
