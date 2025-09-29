import {
    Box,
    List,
    ListItem,
    Typography,
    Button,
    TextField,
} from "@mui/material"
import React, { useEffect, useState } from "react";
import SubmitTodo from "./SubmitTodo";

type Todo = {
    id: string;
    title: string;
    completed: boolean;
    createdAt: number;
    updatedAt: number | null;
    deleted: boolean
};

const Todos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);

    const fetchTodos = async () => {
        const response = await fetch("http://localhost:3000/todos");
        const data = await response.json()

        setTodos(data)
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <Box>
            <Typography variant="h1">ToDoList</Typography>
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
    const deleteHandler = async (id: string) => {
        try {
            await fetch("http://localhost:3000/todos", {
                method: "DELETE",
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
            await fetch("http://localhost:3000/todos", {
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
    const completeHandler = async (id: string) => {
        try {
            await fetch("http://localhost:3000/todos", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, completed: true }),
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
                                <Typography sx={{ flexGrow: 1, textDecoration: todo.completed ? "line-through" : "none" }}>{todo.title}</Typography>
                                {!todo.completed && (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => completeHandler(todo.id)}
                                    >
                                        Complete
                                    </Button>
                                )}
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
                                    onClick={() => deleteHandler(todo.id)}
                                >
                                    {" "}
                                    Delete
                                </Button>
                            </>
                    )}
                    </ListItem>
            ))}
        </List>
    )
}


export default Todos