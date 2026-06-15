const dotenv = require("dotenv");
dotenv.config();

const env = {
  baseUrl: process.env.CLIENT_URL || "http://localhost:5500",
  port: process.env.PORT || 5000,
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: Number(process.env.DB_PORT) || 3306,
  dbName: process.env.DB_NAME || "train",
  dbUser: process.env.DB_USER || "root",
  dbPassword: process.env.DB_PASSWORD || "",
};
module.exports = env;
