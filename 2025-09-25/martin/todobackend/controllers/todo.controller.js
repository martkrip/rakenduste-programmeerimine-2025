import { v4 as uuidv4 } from "uuid";
import { validationResult } from "express-validator";

const todos = [];

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { title } = req.body;
  const newTodo = {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  };

  todos.push(newTodo);
  console.log({ newTodo });
  res.status(201).json({ message: "Task created", todo: newTodo });
};
exports.read = (req, res) => {
  res.status(200).json(todos.filter(todo => !todo.deleted));
};

exports.update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id, title: newTitle, completed } = req.body;

  const todo = todos.find((t) => t.id === id && !t.deleted);
  if (!todo) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (newTitle) todo.title = newTitle;
  if (completed !== undefined) todo.completed = completed;
  todo.updatedAt = Date.now();

  res.status(200).json({ message: "Task updated", todo });
};

exports.delete = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id } = req.body;
  const todo = todos.find((t) => t.id === id && !t.deleted);

  if (!todo) {
    return res.status(404).json({ message: "Task not found" });
  }

  todo.deleted = true;
  todo.updatedAt = Date.now();

  res.status(200).json({ message: "Task deleted", todo });
};
