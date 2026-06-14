const { Router } = require("express");
const router = Router();

const {
  getUsersController,
  authValidateController,
} = require("../controller/users.controller.js");
const { register, login } = require("../controller/auth.controller.js");

router.get("/", (req, res, next) => getUsersController(req, res, next));
router.post("/register", (req, res, next) => register(req, res, next));
router.post("/login", (req, res, next) => login(req, res, next));

module.exports = router;
