"use client";

import { useState } from "react";
import { createRecipe } from "./actions";

export default function CreateTodo() {
  const [newRecipe, setNewRecipe] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newRecipe.trim()) return;

    await createRecipe(new FormData(e.currentTarget))
    setNewRecipe("");
    location.reload();
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        name="content"
        type="text"
        value={newRecipe}
        onChange={(e) => setNewRecipe(e.target.value)}
        placeholder="Write a new recipe (yummy)!"
        className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Add
      </button>
    </form>
  );
}
