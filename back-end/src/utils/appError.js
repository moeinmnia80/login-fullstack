class AppError extends Error {
  constructor(message, status = 500, code = "INTERNAL_ERROR", details = null) {
    super(message);
    this.status = status;
    this.code = code; // machine-readable code
    this.details = details; // optional field-level info
    this.isOperational = true;
  }
}

module.exports = AppError;
