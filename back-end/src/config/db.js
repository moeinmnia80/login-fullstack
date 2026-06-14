const mysql = require("mysql");
const env = require("./env.js");

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

const fetchData = (query, options = []) => {
  return new Promise((resolve, reject) => {
    connectDB.query(query, options, (error, result) => {
      if (error) {
        const dbError = new Error(error.sqlMessage || "Database query failed");

        dbError.statusCode = 500;
        dbError.code = error.code;
        dbError.sqlState = error.sqlState;

        return reject(dbError);
      }

      resolve(structuredClone(result));
    });
  });
};

module.exports = fetchData;
