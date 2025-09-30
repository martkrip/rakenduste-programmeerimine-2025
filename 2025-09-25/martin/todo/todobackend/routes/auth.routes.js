const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller")
const {
    todoRouteMiddleWare,
    todoGetRouteMiddleware,
} = require("../middlewares/todo.middlewares");
const { body } = require("express-validator")
const jwt = require("jsonwebtoken")

router.use(todoRouteMiddleWare);