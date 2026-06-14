const mapDatabaseError = require("../utils/mapDatabaseError.js");
const errorHandler = (err, req, res, next) => {
  err = mapDatabaseError(err);

  const status = err.status || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.isOperational
    ? err.message
    : "An unexpected error occurred"; // hide internal detail in prod
  console.error({
    timestamp: new Date().toISOString(),
    status,
    code,
    message: err.message,
    path: req.originalUrl,
    method: req.method,
  });

  return res.status(status).json({
    success: !err.isOperational,
    error: {
      code,
      message,
      ...(err.details && { details: err.details }),
    },
  });
};

module.exports = errorHandler;
