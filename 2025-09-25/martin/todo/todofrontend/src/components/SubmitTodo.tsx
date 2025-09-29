import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

type SubmitTodoProps = {
    fetchTodos: () => void;
}

const SubmitTodo = ({ fetchTodos }: SubmitTodoProps) => {
    const [title, setTitle] = useState("");

    const submitTodo = async () => {
        try {
            const response = await fetch("http://localhost:3000/todos", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title: title}),
            })

            if (response.ok) {
                console.log("Success", response);
            } else {
                console.warn("No success")
            }
        } catch(error) {
            console.warn(error);
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        submitTodo();
        setTimeout(fetchTodos, 100);
    };
    
    return (
        <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center"}}
    >
        <form onSubmit={handleSubmit}>
            <Stack>
                <TextField
                    label="Task name"
                    onChange={(event) => setTitle(event.target.value)}
                />
                <Button variant="contained" color="success" type="submit">
                Add
                </Button>
            </Stack>
        </form>
    </Box>
    )
}

export default SubmitTodo;