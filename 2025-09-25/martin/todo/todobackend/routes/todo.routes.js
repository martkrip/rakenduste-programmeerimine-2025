const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller")
const {
    todoRouteMiddleWare,
    todoGetRouteMiddleware,
} = require("../middlewares/todo.middlewares");
const { body } = require("express-validator")

router.use(todoRouteMiddleWare);

router.get("/", todoGetRouteMiddleware, todoController.read);

router.post("/",
    body("title").isString().notEmpty().withMessage("Title is required"),
    todoController.create
);

router.put("/",
    body("id").isString().withMessage("ID is required"),
    body("title").optional().isString(),
    body("completed").optional().isBoolean().withMessage("Completed must be true or false"),
    todoController.update
);

router.delete("/",
    body("id").isUUID().withMessage("ID is required"),
    todoController.delete
);
module.exports = router;