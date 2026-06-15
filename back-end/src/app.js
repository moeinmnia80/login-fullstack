const express = require("express");
const cors = require("cors");
const notFound = require("./middleware/notFound.middleware.js");
const errorHandler = require("./middleware/error.middleware.js");
const { getCoursesController } = require("./controller/courses.controller.js");
const corsOptions = require("./config/cors.js");

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.set("X-Request-Id", crypto.randomUUID());
  next();
});

// ───── Routes ──────────────────────────────────────────
app.use("/users", require("./router/users.router.js"));
app.get("/courses", (req, res, next) => getCoursesController(req, res, next));
// ───── 404 ─────────────────────────────────────────────
app.use(notFound);
// ── Error handler ──────────────────────────────────────
app.use(errorHandler);
// ── uncaughtException  ─────────────────────────────────
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
  process.exit(1);
});

module.exports = app;
