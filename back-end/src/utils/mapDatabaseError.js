const AppError = require("./AppError");

const mapDatabaseError = (err) => {
  if (!err || err.isOperational) return err;

  const map = {
    ER_DUP_ENTRY: {
      status: 409,
      code: "CONFLICT_ERROR",
      msg: "Duplicate entry",
    },

    ER_NO_REFERENCED_ROW_2: {
      status: 400,
      code: "VALIDATION_ERROR",
      msg: "Referenced record not found",
    },

    ER_ROW_IS_REFERENCED_2: {
      status: 409,
      code: "CONFLICT_ERROR",
      msg: "Record is referenced by another resource",
    },

    ER_BAD_FIELD_ERROR: {
      status: 400,
      code: "QUERY_ERROR",
      msg: "Invalid column in query",
    },

    ER_PARSE_ERROR: {
      status: 400,
      code: "QUERY_ERROR",
      msg: "SQL syntax error",
    },

    ER_DATA_TOO_LONG: {
      status: 400,
      code: "VALIDATION_ERROR",
      msg: "Data too long for column",
    },

    ER_TRUNCATED_WRONG_VALUE: {
      status: 400,
      code: "VALIDATION_ERROR",
      msg: "Invalid value for column type",
    },

    ER_ACCESS_DENIED_ERROR: {
      status: 500,
      code: "DATABASE_ERROR",
      msg: "Database access denied",
    },

    ECONNREFUSED: {
      status: 500,
      code: "DATABASE_ERROR",
      msg: "Database connection refused",
    },

    PROTOCOL_CONNECTION_LOST: {
      status: 500,
      code: "DATABASE_ERROR",
      msg: "Database connection lost",
    },
  };

  const mapped = map[err.code];

  if (mapped) {
    const appErr = new AppError(mapped.msg, mapped.status, mapped.code);
    appErr.originalError = err;
    return appErr;
  }

  const unknownError = new AppError("Database error", 500, "DATABASE_ERROR");

  unknownError.originalError = err;

  return unknownError;
};

module.exports = mapDatabaseError;
