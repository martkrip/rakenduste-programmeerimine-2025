const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller")
const {
    todoRouteMiddleWare,
    todoGetRouteMiddleware,
} = require("../middlewares/todo.middlewares");
const { body } = require("express-validator")

router.use(todoRouteMiddleWare);

router.get("/", todoGetRouteMiddleware, todoController.readAll);

router.put("/todos/toggle-delete",
    body("id").isUUID().withMessage("ID is required"),
    todoController.toggleDelete
)
module.exports = router