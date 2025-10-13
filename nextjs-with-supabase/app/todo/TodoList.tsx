"use client"

import DeleteTodo from "./DeleteTodo";
import UpdateTodo from "./UpdateTodo";

type Todo = {
    id: number
    task: string
};

export default function TodoList({ todos }: { todos: Todo[] }) {
      return (
        <div className="max-w-3xl mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4">Todo List</h1>
          <div className="space-y-4 mt-6">
            {todos && todos.length > 0 ? (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="flex justify-between items-center bg-white rounded-lg shadow p-4"
                >
                  <span className="text-gray-800">{todo.task}</span>
                  <UpdateTodo todoId={todo.id} currentTask={todo.task} />
                  <DeleteTodo todoId={todo.id} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No tasks yet.</p>
            )}
          </div>
        </div>
      );
    }