const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller")
const {
    todoRouteMiddleWare,
    todoGetRouteMiddleware,
} = require("../middlewares/todo.middlewares");
const { body } = require("express-validator")

router.use(todoRouteMiddleWare);

router.get("/todos", todoGetRouteMiddleware, todoController.readAll);

router.put("/todos/toggle-delete",
    body("id").isUUID().withMessage("ID is required"),
    todoController.toggleDelete
)
router.put("/todos",
    body("title").optional().isString(),
    body("completed").optional().isBoolean().withMessage("Completed must be true or false"),
    todoController.adminUpdate
)
module.exports = router