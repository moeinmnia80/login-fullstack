const mysql = require("mysql");
const env = require("./env.js");
const mapDatabaseError = require("../utils/mapDatabaseError.js");

const connectDB = mysql.createPool({
  host: env.dbHost,
  port: env.dbPort,
  user: env.dbUser,
  password: env.dbPassword,
  database: env.dbName,
  // Max 10 connections
  connectionLimit: 10,
  // if connections are busy, create a stack and waiting
  waitForConnections: true,
  // Max queries number in the stack
  queueLimit: 0,
  //The amount of time allowed to connect to the database before timeout ( milliseconds )
  connectTimeout: 10000,
});

const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    connectDB.query(query, params, (error, result) => {
      if (error) {
        const mappedError = mapDatabaseError(error);

        if (env.nodeEnv === "development") {
          mappedError.details = error.sqlMessage;
        }

        return reject(mappedError);
      }

      resolve(result);
    });
  });
};

module.exports = executeQuery;
