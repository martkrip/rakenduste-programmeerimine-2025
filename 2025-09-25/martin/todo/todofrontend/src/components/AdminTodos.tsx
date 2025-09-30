import {
  Box,
  List,
  ListItem,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SubmitTodo from "./SubmitTodo";
import { Link as RouterLink } from "react-router-dom";
import { Link as MUILink } from "@mui/material";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const AdminTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:3000/admin/todos");
    const data = await response.json();
    console.log(data);
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Box>
      <Typography variant="h1">Admin: ToDoList</Typography>
      <TodosList todos={todos} fetchTodos={fetchTodos} />
      <SubmitTodo fetchTodos={fetchTodos} />
    </Box>
  );
};

type TodosListProps = {
  todos: Todo[];
  fetchTodos: () => void;
};

const TodosList: React.FC<TodosListProps> = ({ todos, fetchTodos }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  console.log({ todos });
  const toggleDeleteHandler = async (id: string) => {
    try {
      await fetch("http://localhost:3000/admin/todos/toggle-delete", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };
  const updateHandler = async (id: string) => {
    try {
      if (!newTitle) return;
      await fetch("http://localhost:3000/admin/todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, title: newTitle }),
      });
      setEditingId(null);
      setNewTitle("");
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };
  const completeHandler = async (id: string, currentCompleted: boolean) => {
    try {
      await fetch("http://localhost:3000/admin/todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, completed: !currentCompleted }),
      });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <List>
      {todos.map((todo) => (
        <ListItem key={todo.id}>
          {editingId === todo.id ? (
            <>
              <TextField
                size="small"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => updateHandler(todo.id)}
              >
                Save
              </Button>
              <Button variant="outlined" onClick={() => setEditingId(null)}>
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Typography
                sx={{
                  flexGrow: 1,
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => completeHandler(todo.id, todo.completed)}
                >
                  {todo.completed ? "Uncomplete" : "Complete"}
                </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  setEditingId(todo.id);
                  setNewTitle(todo.title);
                }}
              >
                {" "}
                Update
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => toggleDeleteHandler(todo.id)}
              >
                {" "}
                {todo.deleted ? "Undelete" : "Delete"}
              </Button>
            </>
          )}
        </ListItem>
      ))}
      <MUILink component={RouterLink} to="/">
        Go to Home Page
      </MUILink>
    </List>
  );
};

export default AdminTodos;
