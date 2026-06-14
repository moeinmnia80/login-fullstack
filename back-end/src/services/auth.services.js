const bcrypt = require("bcrypt");
const AppError = require("../utils/appError.js");
const {
  createUser,
  findUserByEmail,
} = require("../repositories/users.repository.js");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await findUserByEmail(email);

  if (!!existingUser.length) {
    throw new AppError("User already exists", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  return {
    user,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user.length) {
    throw new AppError("user not found!", 401);
  }

  const isMatch = await bcrypt.compare(password, user[0].password);

  if (!isMatch) {
    throw new AppError("username or password is incorrect!", 401);
  }

  return {
    status: "success",
    user: {
      name: user[0].name,
      email: user[0].email,
    },
  };
};

module.exports = { registerUser, loginUser };
