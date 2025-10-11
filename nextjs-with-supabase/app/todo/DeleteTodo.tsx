"use client";

import { deleteTodo } from "./actions";

export default function DeleteTodo({ todoId }: { todoId: number }) {

  async function handleDelete() {
    await deleteTodo(todoId);
    location.reload();
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
    >
      Delete
    </button>
  );
}
