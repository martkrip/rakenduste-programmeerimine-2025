const express = require("express");
const router = express.Router();
const { body } = require("express-validator")
const authController = require("../controllers/auth.controller")

router.post("/login", authController.login);
router.get("/ping", authController.ping)

module.exports = router