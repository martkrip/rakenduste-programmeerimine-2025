const express = require("express");
const router = express.Router();
const catsController = require("../controllers/cats.controller");
const {
  catsRouteMiddleware,
  catsGetRouteMiddleware,
} = require("../middlewares/cats.middlewares");
const {body } = require("express-validator")

router.use(catsRouteMiddleware);

// /cats/ Get endpoint level middleware
router.get("/", catsGetRouteMiddleware, catsController.read);

router.post("/",
  body("name").isString().notEmpty().withMessage("Name is required"),
  catsController.create);

router.put("/",
  body("id").isString().withMessage("ID is required"),
  body("name").optional().isString(),
  catsController.update);

router.delete("/",
  body("id").isString().withMessage("ID is required"),
  catsController.delete);

module.exports = router;