const env = require("./env.js");

const corsOptions = {
  origin: env.baseUrl || "http://localhost:5500",
  method: ["POST", "GET"],
  allowedHeaders: ["Content-Type"],
  credentials: true,
};

module.exports = corsOptions;
